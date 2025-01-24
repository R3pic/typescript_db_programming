import * as readline from "node:readline/promises";
import * as process from "node:process";

export async function input(msg: string): Promise<string> {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    const result = await rl.question(msg);
    rl.close();
    return result;
}