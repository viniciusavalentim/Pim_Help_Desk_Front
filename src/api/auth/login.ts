import api from "@/lib/axios";

export interface LoginParams {
    email: string;
    password: string;
}

export interface LoginResponse {
    data: any;
    message: string;
    status: true;
}

export async function Login({ password, email }: LoginParams) {
    const response = await api.post<LoginResponse>("/api/Auth/login", {
        email,
        password
    });

    return response.data;
}   