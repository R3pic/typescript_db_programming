import { DataBaseMessage, type ResultMessage } from "@cli/message.ts";
import { Student } from "@student/student.ts";
import type { StudentService } from "@student/student-service.ts";

export class MethodData {
    constructor(
        public title: string,
        public func: Function,
        public getMessage: ResultMessage,
    ) {
    }

    static fromStudentService(service: StudentService): MethodData[] {
        return [
            new MethodData(
                "학생 전체 목록을 조회합니다.",
                async () => await service.getStudents(),
                DataBaseMessage.SELECT_RESULT_MESSAGE
            ),
            new MethodData(
                "학번이 20110101인 학생을 조회합니다.",
                async () => await service.getStudentByNo("20110101"),
                DataBaseMessage.SELECT_RESULT_MESSAGE
            ),
            new MethodData(
                "이름이 일지매인 학생을 조회합니다.",
                async () => await service.getStudentByName("일지매"),
                DataBaseMessage.SELECT_RESULT_MESSAGE
            ),
            new MethodData(
                "생일이 1990-03-01인 학생을 조회합니다.",
                async () => await service.getStudentByBirthday("1990-03-01"),
                DataBaseMessage.SELECT_RESULT_MESSAGE
            ),
            new MethodData(
                "학번이 20110402이고, 이름이 이순삼인 학생을 추가합니다.",
                async () => await service.insertStudent(new Student("20110402", "이순삼")),
                DataBaseMessage.INSERT_RESULT_MESSAGE
            ),
            new MethodData(
                "학번이 20110502, 20110602, 20110702, 20110802이고, \n\t이름이 이율국, 이소일, 심순해, 임꺽정인 학생을 추가합니다.",
                async () =>
                    await service.insertStudentsMulti([
                        new Student("20110502", "이율국"),
                        new Student("20110602", "이소일"),
                        new Student("20110702", "심순해"),
                        new Student("20110802", "임꺽정"),
                    ]),
                DataBaseMessage.INSERT_RESULT_MESSAGE
            ),
            new MethodData(
                "학번이 20110902, 20111002, 20111102, 20111202이고, \n\t이름이 이상훈, 강동희, 김호성, 김정준인 학생을 추가합니다.",
                async () =>
                    await service.insertStudentsMulti([
                        new Student("20110902", "이상훈"),
                        new Student("20111002", "강동희"),
                        new Student("20111102", "김호성"),
                        new Student("20111202", "김정준"),
                    ]),
                DataBaseMessage.INSERT_RESULT_MESSAGE
            ),
            new MethodData(
                "학번 20110402인 학생의 생일을 1990-03-21로 변경합니다.",
                async () => await service.updateStudent(new Student('20110402', '', new Date('1990-03-21'))),
                DataBaseMessage.UPDATE_RESULT_MESSAGE
            ),
            new MethodData(
                "학번이 20110402인 학생의 생일을 1990-03-25으로 변경합니다.",
                async () => await service.updateStudent(new Student('20110402', '', new Date('1990-03-25'))),
                DataBaseMessage.UPDATE_RESULT_MESSAGE
            ),
            new MethodData(
                "학번이 20110502, 20110602, 20110702, 20110802인 학생의 생일을 각각\n\t" +
                "1990-03-01, 1990-04-01, 1990-05-01, 1990-06-01, 1990-07-01, 1990-08-01, 1990-09-01, 1990-10-01으로 변경합니다.",
                async () => await service.updateStudentMulti([
                    new Student("20110502", "이율곡", new Date("1990-03-01")),
                    new Student("20110602", "이수일", new Date("1990-04-01")),
                    new Student("20110702", "심순애", new Date("1990-05-01")),
                    new Student("20110802", "임꺽정", new Date("1990-06-01")),
                    new Student("20110902", "이상훈", new Date("1990-07-01")),
                    new Student("20111002", "강동희", new Date("1990-08-01")),
                    new Student("20111102", "김호성", new Date("1990-09-01")),
                    new Student("20111202", "김정준", new Date("1990-10-01")),
                ]),
                DataBaseMessage.UPDATE_RESULT_MESSAGE
            ),
            new MethodData(
                "학번이 20110401인 학생을 목록에서 제거합니다.",
                async () => await service.deleteStudentByNo('20110402'),
                DataBaseMessage.DELETE_RESULT_MESSAGE
            ),
            new MethodData(
                "학번이 20110502, 20110602, 20110702, 20110802인 학생을 목록에서 제거합니다.",
                async () => await service.deleteStudentNoMulti([
                    new Student("20110502"),
                    new Student("20110602"),
                    new Student("20110702"),
                    new Student("20110802"),
                    new Student("20110902"),
                    new Student("20111002"),
                    new Student("20111102"),
                    new Student("20111202"),
                ]),
                DataBaseMessage.DELETE_RESULT_MESSAGE
            )
        ];
    }
}