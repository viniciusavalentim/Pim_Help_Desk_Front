import api from "@/lib/axios";
import { User } from "@/utils/types";

export interface RegisterParams {
    phone: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterResponse {
    message: string;
    user: User;
    token: string;
    refreshToken: string;
}

export async function Register({ confirmPassword, password, phone }: RegisterParams) {
    const response = await api.post<RegisterResponse>("/auth/register", {
        phone,
        password,
        confirmPassword
    });

    return response.data;
}   