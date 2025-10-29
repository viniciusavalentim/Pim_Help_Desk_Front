import api from "@/lib/axios";
import { Ticket } from "@/utils/types";

export interface GetTicketParams {
    ticketId?: string;
}

export interface GetTicketResponse {
    ticket: Ticket
}

export async function GetTicket({ ticketId }: GetTicketParams) {
    const response = await api.get<GetTicketResponse>("/api/Ticket/" + ticketId);
    return response.data;
}   