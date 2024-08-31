import { describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { server } from "./test/mocks/server";
import { http, HttpResponse } from "msw";

describe("테스트", () => {
    test("vitest 테스트", () => {
        expect(true).toBeTruthy();
    });

    test("유저 데이터를 불러와서 렌더링한다.", async () => {
        render(<App />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
        expect(await screen.findByText("User")).toBeInTheDocument();
    });

    test("에러가 발생하면 에러 메시지를 렌더링한다.", async () => {
        server.use(
            http.get("/api/user", () => {
                return HttpResponse.json(
                    { message: "에러 발생" },
                    { status: 401 }
                );
            })
        );

        render(<App />);

        expect(screen.getByText("Loading...")).toBeInTheDocument();
        expect(await screen.findByText("Error...")).toBeInTheDocument();
    });
});
