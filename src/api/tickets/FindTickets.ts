import api from "@/lib/axios";
import { Ticket } from "@/utils/types";

export interface GetTicketsParams {
    requesterId?: string;
    attendantId?: string;
    searchText?: string;
    priority?: string
    status?: string
    startDate?: string
    endDate?: string
}

export interface GetTicketsResponse {
    tickets: Ticket[]
}

export async function GetTickets({ attendantId, requesterId, searchText, endDate, priority, startDate, status }: GetTicketsParams) {
    const priorityValue = priority && priority != 'all' ? Number(priority) : undefined;
    const statusValue = status && status != 'all' ? Number(status) : undefined;

    const response = await api.get<GetTicketsResponse>("/api/Ticket", {
        params: {
            attendantId, requesterId, searchText, endDate, startDate,
            priority: priorityValue,
            status: statusValue
        }
    });

    return response.data;
}   