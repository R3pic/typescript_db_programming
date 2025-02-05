import { Client } from "pg";
import {env} from "@common/env.ts";

export const setConnection = async () => {
    const clientOptions = {
        host: "localhost",
        port: env.get<number>('POSTGRES_PORT'),
        user: env.get('DB_USER'),
        password: env.get('DB_PASSWORD'),
        database: env.get('POSTGRES_DB'),
    }

    const client = new Client(clientOptions);

    await client.connect();
    return client;
}