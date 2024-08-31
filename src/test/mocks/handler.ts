import { http, HttpResponse } from "msw";

export interface UserResponse {
    id: number;
    username: string;
}

const user: UserResponse = {
    id: 1,
    username: "giho",
};

export const handlers = [
    http.get("/api/user", () => {
        return HttpResponse.json(user);
    }),
];
