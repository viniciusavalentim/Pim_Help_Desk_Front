// src/api/tickets/finishTicket.ts
import api from "@/lib/axios";

export interface FinishTicketParams {
    ticketId: string;
    userId: string;
}

export interface FinishTicketResponse {
    success: boolean;
    message: string;
}

export async function FinishTicket({ ticketId, userId }: FinishTicketParams) {
    const response = await api.put<FinishTicketResponse>("/api/Ticket/finish", {
        ticketId,
        userId,
    });

    return response.data;
}
