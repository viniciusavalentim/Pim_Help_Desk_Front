import api from "@/lib/axios";

export interface ChatMessage {
    role: "user" | "assistant";
    content: string;
}

export interface StoreChatMessagesParams {
    conversationId: string | null;
    userId: string;
    message: string;
    history: ChatMessage[];
}

export interface StoreChatMessagesResponse {
    conversationId: string;
    candidates: {
        content: {
            parts: { text: string }[];
            role: "model";
        };
    }[];
}

export async function StoreChatMessages({
    conversationId,
    userId,
    message,
    history,
}: StoreChatMessagesParams) {
    const response = await api.post<StoreChatMessagesResponse>("/api/OpenAi", {
        conversationId,
        userId,
        message,
        history,
    });

    return response.data;
}
