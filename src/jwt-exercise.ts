import * as crypto from "node:crypto";

interface JWTPayload {
    userId: string;
    username: string;
    exp?: number;
    iat?: number;
}

const SECRET_KEY = "wisoft-laboratory-jwt-token-keys";

export function createJWT(
    payload: JWTPayload,
    secret: string,
    expireIn: number,
): string {
    const header = {
        alg: "HS256",
        typ: "JWT",
    }

    const now = Math.floor(Date.now() / 1000);
    const finalPayLoad = {
        ...payload,
        iat: now,
        exp: now + expireIn,
    }

    const base64Header = Buffer.from(JSON.stringify(header)).toString("base64url");
    const base64Payload = Buffer.from(JSON.stringify(finalPayLoad)).toString("base64url");
    const signature = crypto
        .createHmac("sha256", secret)
        .update(`${base64Header}.${base64Payload}`)
        .digest("base64url");

    return `${base64Header}.${base64Payload}.${signature}`;
}

export function verifyJWT(
    token: string,
    secret: string,
): JWTPayload | null {
    const [header, payload, signature] = token.split(".");

    const expectedSignature = crypto
        .createHmac("sha256", secret)
        .update(`${header}.${payload}`)
        .digest('base64url');

    if (signature != expectedSignature)
        return null;

    const result = JSON.parse(Buffer.from(payload, "base64url").toString()) as JWTPayload;
    const now = Math.floor(Date.now() / 1000);

    if (result.exp && result.exp < now)
        return null;

    return result;
}

const payload: JWTPayload = {
    userId: "20201914",
    username: "정예환",
};

try {
    const token = createJWT(payload, SECRET_KEY, 3600);
    console.info(`Generated JWT: ${token}`);

    const decodedPayload = verifyJWT(token, SECRET_KEY);

    if (decodedPayload) {
        console.info("Decoded payload : ", decodedPayload);
    } else {
        console.info("Invaild JWT");
    }
} catch (e) {
    console.error(`JWT Error : ${JSON.stringify(e)}`);
}