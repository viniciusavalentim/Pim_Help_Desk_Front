import api from "@/lib/axios";
import { User } from "@/utils/types";

export interface LoginParams {
    phone: string;
    password: string;
}

export interface LoginResponse {
    message: string;
    user: User;
    token: string;
    refreshToken: string;
}

export async function Login({ password, phone }: LoginParams) {
    const response = await api.post<LoginResponse>("/auth/login", {
        phone,
        password,
    });

    return response.data;
}   