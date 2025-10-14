import api from "@/lib/axios";

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export interface Conversation {
    id: string;
    title: string;
    createdAt: string;
    updatedAt: string;
    messages: ChatMessage[];
}

export interface GetChatMessagesParams {
    chatId: string;
}

export interface GetChatMessagesResponse {
    conversations: Conversation[];
}

export async function GetChatMessages({ chatId }: GetChatMessagesParams) {
    const response = await api.get<GetChatMessagesResponse>(`/api/OpenAi/${chatId}`);
    return response.data;
}
