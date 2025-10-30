import api from "@/lib/axios";

export interface AcceptTicketParams {
    ticketId: string;
    userId: string;
}

export interface AcceptTicketResponse {
    success: boolean;
    message: string;
}

export async function AcceptTicket({ ticketId, userId }: AcceptTicketParams) {
    const response = await api.post<AcceptTicketResponse>("/api/Ticket/accept", {
        ticketId,
        userId,
    });

    return response.data;
}
