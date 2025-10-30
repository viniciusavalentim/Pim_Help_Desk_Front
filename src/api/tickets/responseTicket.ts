// src/api/tickets/responseTicket.ts
import api from "@/lib/axios";

export interface ResponseTicketParams {
    ticketId: string;
    userId: string;
    title: string;
}

export interface ResponseTicketResponse {
    success: boolean;
    message: string;
}

export async function ResponseTicket({ ticketId, userId, title }: ResponseTicketParams) {
    const response = await api.post<ResponseTicketResponse>("/api/Ticket/response", {
        ticketId,
        userId,
        title,
    });

    return response.data;
}
