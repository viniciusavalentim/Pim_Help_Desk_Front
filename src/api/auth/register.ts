import api from "@/lib/axios";

export interface RegisterParams {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface RegisterResponse {
    token: string;
    message: string;
    status: true;
    user: any;
}

export async function Register({ confirmPassword, password, email, name }: RegisterParams) {
    const response = await api.post<RegisterResponse>("/api/Auth/register", {
        password,
        confirmPassword,
        email,
        name
    });

    return response.data;
}   