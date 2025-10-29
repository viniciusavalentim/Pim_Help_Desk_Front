import api from "@/lib/axios";

export interface storeTicketParams {
    requesterId: string;
    title: string;
    description: string;
    category: string
    priority: string
}

export interface StoreTicketResponse {
    success: boolean;
    message: string
}

export async function StoreTicket({ requesterId, priority, category, description, title }: storeTicketParams) {

    const response = await api.post<StoreTicketResponse>("/api/Ticket", {
        requesterId,
        priority,
        category,
        description,
        title
    });

    return response.data;
}   