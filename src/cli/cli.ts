import { DatabaseError } from "pg";

import type { StudentService } from "@student/student-service.ts";
import { MethodData } from "@cli/method-data.ts";
import { input } from "@common/console.ts";
import {formatStringToIndexTitle} from "@common/utils.ts";

export class CLI {
    methods: MethodData[];
    USER_INPUT_MESSAGE: string;
    constructor(service: StudentService) {
        this.methods = MethodData.fromStudentService(service);
        this.USER_INPUT_MESSAGE = `Enter a number (1-${this.methods.length}) or \'q\' to exit: `;
    }

    async run(): Promise<void> {
        const isExit = (v: string) => v === 'q' || v === 'Q';
        const isMenu = (v: string) => v === 'm' || v === 'M';

        while (true) {
            const inputValue = await input(this.USER_INPUT_MESSAGE)

            if (isExit(inputValue)) {
                break;
            }

            if (isMenu(inputValue)) {
                this.showMenu();
                continue;
            }

            const num = parseInt(inputValue, 10);
            await this.executeMethod(num);
        }
    }

    private async executeMethod(num: number) {
        const isInvalid = (num: number) => isNaN(num) || num < 1 || num > this.methods.length;

        if (isInvalid(num)) {
            console.log(`Invalid Input. ${this.USER_INPUT_MESSAGE}`);
            return;
        }

        const methodData = this.methods.at(num - 1);

        if (methodData) {
            try {
                const { title, getMessage, func } = methodData;
                console.info(formatStringToIndexTitle(num, title));
                const result = await func();
                console.info(getMessage(result));
            } catch (error) {
                if (error instanceof DatabaseError)
                    console.error("데이터베이스 에러", error);
                else
                    console.error("예상하지 못한 에러.", error);
            }
        }
    }

    private showMenu = (() => {
        let titles: string[] | null = null;

        const load = () => {
            if (titles === null) {
                titles = this.methods.map(({ title }, i) => formatStringToIndexTitle(i + 1, title));
            }

            return titles;
        };

        return () => {
            const titles = load();
            titles.forEach((v) => console.info(v));
        };
    })();
}