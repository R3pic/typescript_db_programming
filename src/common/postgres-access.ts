import { Client } from "pg";

const DATABASE = Bun.env.DATABASE || "exercise";

export const setConnection = async () => {
    const client = new Client({
        host: "localhost",
        port: 15432,
        user: "yehwan",
        password: "dpghks",
        database: DATABASE,
    });

    await client.connect();
    return client;
}