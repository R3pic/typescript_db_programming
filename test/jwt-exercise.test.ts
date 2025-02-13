import {
    describe,
    test,
    expect
} from "bun:test";
import {createJWT, verifyJWT} from "@/jwt-exercise.ts";

describe("JWT 테스트", () => {
    const SECRET_KEY = "wisoft-laboratory-jwt-token-keys";
    const testPayload = {
        userId: "20201914",
        username: "정예환",
    }

    test(`JWT 토큰 생성 및 검증`, () => {
        const token = createJWT(testPayload, SECRET_KEY, 3600);

        expect(token).toBeDefined();
        expect(typeof token).toBe("string");

        const decoded = verifyJWT(token, SECRET_KEY);
        expect(decoded).toBeDefined();
        expect(decoded?.userId).toBe(testPayload.userId);
        expect(decoded?.username).toBe(testPayload.username);
    })

    test("만료된 토큰 검증", () => {
        const token = createJWT(testPayload, SECRET_KEY, -3600);
        const decoded = verifyJWT(token, SECRET_KEY);

        expect(decoded).toBeNull();
    });

    test("잘못된 시크릿 키로 검증", () => {
        const token = createJWT(testPayload, SECRET_KEY, 3600);
        const decoded = verifyJWT(token, "wrong-test-key");
        expect(decoded).toBeNull();
    });

    test("페이로드 구조 검증", () => {
        const token = createJWT(testPayload, SECRET_KEY, 3600);
        const decoded = verifyJWT(token, SECRET_KEY);

        expect(decoded).toHaveProperty('iat');
        expect(decoded).toHaveProperty('exp');
        expect(decoded?.exp).toBeGreaterThan(decoded?.iat || 0);
    });
})