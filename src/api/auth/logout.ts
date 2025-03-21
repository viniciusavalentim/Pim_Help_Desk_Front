import api from "@/lib/axios";


export interface LogoutResponse {
    message?: string;
    error?: string;
}

export async function Logout() {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
        return Error("Refresh token não encontrado");
    }

    const response = await api.post<LogoutResponse>("/auth/logout", {
        refreshToken
    });

    return response.data;
}   