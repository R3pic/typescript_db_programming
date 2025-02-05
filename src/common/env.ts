enum RequireKeys {
    POSTGRES_PORT,
    POSTGRES_DB,
    DB_USER,
    DB_PASSWORD,
}

class Environment {
    constructor() {
        Object.keys(RequireKeys).forEach((key) => {
            if(isNaN(parseInt(key))) {
                if (!Bun.env[key]) throw new Error(`${key} Not Set. is Required.`);
            }
        });
    }

    get<T = string>(key: keyof typeof RequireKeys): T {
        const v = Bun.env[key];
        if (!v) throw new Error(`${key} Not Set.`);
        if (!isNaN(parseInt(v, 10))) return parseInt(v, 10) as T;

        return v as T;
    }
}

export const env = new Environment();