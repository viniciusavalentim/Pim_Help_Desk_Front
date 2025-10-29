import { useState, useEffect, useRef } from "react";
import { MessageCircle, X, Send, ArrowLeft, Plus, Loader2, ArrowDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Input } from "@/components/ui/input";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useAuth } from "@/context/AuthContext";
import { GetChatMessages, Conversation } from "@/api/chat/getChatMessages";
import { StoreChatMessages } from "@/api/chat/storeChatMessages";
import { toast } from "sonner";
import { queryClient } from "@/lib/queryClient";

const FormattedMessage = ({ content }: { content: string }) => {
    return (
        <ReactMarkdown
            components={{
                p: ({ node, ...props }) => <p className="mb-2 last:mb-0" {...props} />,
                strong: ({ node, ...props }) => <strong className="font-bold" {...props} />,
                ul: ({ node, ...props }) => <ul className="list-disc list-inside space-y-1" {...props} />,
                li: ({ node, ...props }) => <li className="pl-2" {...props} />,
            }}
        >
            {content}
        </ReactMarkdown>
    );
};

const TypingIndicator = () => (
    <div className="flex justify-start">
        <div className="bg-white text-gray-800 rounded-2xl rounded-bl-none shadow-sm px-4 py-3 flex items-center space-x-2">
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.3s]"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse [animation-delay:-0.15s]"></span>
            <span className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></span>
        </div>
    </div>
);

export default function FloatingChat() {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [view, setView] = useState<"list" | "chat">("list");
    const [activeChatId, setActiveChatId] = useState<string | null>(null);
    const [showScrollButton, setShowScrollButton] = useState(false);

    const chatRef = useRef<HTMLDivElement>(null);
    const chatContainerRef = useRef<HTMLDivElement>(null);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const toggleButtonRef = useRef<HTMLButtonElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const { data: findChatsQuery, isLoading: isLoadingChats } = useQuery({
        queryKey: ["findChatQuery", user?.id],
        queryFn: () => GetChatMessages({ userId: user?.id ?? "" }),
        enabled: !!isOpen && !!user?.id,
    });

    const { mutateAsync: storeChatMessageFn, isPending } = useMutation({
        mutationFn: StoreChatMessages,
        onMutate: async (newMessage) => {
            await queryClient.cancelQueries({ queryKey: ["findChatQuery", user?.id] });
            const previousChats = queryClient.getQueryData<Conversation[]>(["findChatQuery", user?.id]);

            queryClient.setQueryData(["findChatQuery", user?.id], (oldData: any) => {
                const userMessage = { role: "user", content: newMessage.message };

                if (!activeChatId) {
                    return {
                        ...oldData,
                        conversations: [
                            ...(oldData?.conversations ?? []),
                            {
                                id: `temp-id-${Date.now()}`,
                                title: "Nova Conversa",
                                createdAt: new Date().toISOString(),
                                messages: [userMessage],
                            },
                        ],
                    };
                }
                return {
                    ...oldData,
                    conversations: oldData.conversations.map((convo: Conversation) =>
                        convo.id === activeChatId
                            ? { ...convo, messages: [...convo.messages, userMessage] }
                            : convo
                    ),
                };
            });
            return { previousChats };
        },
        onError: (err, newMessage, context) => {
            console.error(err, newMessage);
            toast.error("Erro ao enviar mensagem.");
            if (context?.previousChats) {
                queryClient.setQueryData(["findChatQuery", user?.id], context.previousChats);
            }
        },
        onSettled: (data) => {
            if (data) {
                setActiveChatId(data.conversationId);
            }
            queryClient.invalidateQueries({ queryKey: ["findChatQuery", user?.id] });
        },
    });

    const handleSendMessage = async (content: string) => {
        const trimmedContent = content.trim();
        if (!trimmedContent || isPending) return;

        setMessage("");

        const currentActiveChat = findChatsQuery?.conversations.find(c => c.id === activeChatId);
        try {
            await storeChatMessageFn({
                conversationId: activeChatId,
                history: currentActiveChat?.messages ?? [],
                message: trimmedContent,
                userId: user?.id ?? "",
            });
        } catch (error) {
            console.error(error);
            setMessage(trimmedContent);
        }
    };

    const activeChat = findChatsQuery?.conversations.find((chat) => chat.id === activeChatId || chat.id.startsWith("temp-id"));

    // Efeito para auto-scroll inteligente
    useEffect(() => {
        if (!showScrollButton) {
            scrollToBottom();
        }
    }, [activeChat?.messages.length]);

    // Lógica para fechar ao clicar fora, corrigindo o bug do duplo clique
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as Node;
            if (isOpen && chatRef.current && !chatRef.current.contains(target) && toggleButtonRef.current && !toggleButtonRef.current.contains(target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    // Efeito para detectar scroll e mostrar/ocultar o botão "Voltar para Baixo"
    useEffect(() => {
        const container = chatContainerRef.current;
        const handleScroll = () => {
            if (container) {
                const { scrollTop, scrollHeight, clientHeight } = container;
                const isScrolledUp = scrollHeight - scrollTop > clientHeight + 200;
                setShowScrollButton(isScrolledUp);
            }
        };
        if (container) container.addEventListener('scroll', handleScroll);
        return () => {
            if (container) container.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const preMadeQuestions = [
        "Como faço para redefinir minha senha?",
        "Como entro em contato com o suporte?",
        "Quais são os horários de atendimento?",
    ];

    const createNewChat = () => { setActiveChatId(null); setView("chat"); };
    const openChat = (chatId: string) => { setActiveChatId(chatId); setView("chat"); };
    const goBackToList = () => { setView("list"); };

    return (
        <>
            <div
                ref={chatRef}
                className={`fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-in-out z-50 ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"}`}
            >
                {/* Cabeçalho */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl p-4 flex items-center gap-2">
                    {view === "chat" && <button onClick={goBackToList} className="text-white hover:bg-blue-500 rounded-full p-1 transition-colors"><ArrowLeft className="w-5 h-5" /></button>}
                    <div className="w-12 h-12 rounded-full flex items-center justify-center"><img src="/pass.png" width={100} height={100} alt="Logo" /></div>
                    <div className="flex-1"><h3 className="text-white font-semibold">{view === "list" ? "Sabiá | Central de Atendimento" : (activeChat?.title ? activeChat.title.slice(0, 40) + "..." : "Assistente Virtual")}</h3><p className="text-blue-100 text-sm">{view === "list" ? "Suas conversas" : "Online - Resposta rápida"}</p></div>
                    {view === "list" && <button onClick={createNewChat} className="text-white hover:bg-blue-500 rounded-full p-2 transition-colors" title="Nova conversa"><Plus className="w-5 h-5" /></button>}
                </div>

                {/* Corpo do Chat */}
                <div className="relative">
                    <div ref={chatContainerRef} className="h-96 overflow-y-auto p-4 bg-gray-50 scroll-smooth">
                        {view === "list" ? (
                            <div className="space-y-3">
                                {isLoadingChats ? <Loader2 className="mx-auto my-12 h-8 w-8 animate-spin text-blue-500" /> :
                                    (findChatsQuery?.conversations.length === 0 ? (
                                        <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                            <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
                                            <h4 className="text-lg font-semibold text-gray-700 mb-2">Nenhuma conversa ainda</h4>
                                            <button onClick={createNewChat} className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">Iniciar Conversa</button>
                                        </div>
                                    ) : (
                                        findChatsQuery?.conversations.map((chat) => (
                                            <button key={chat.id} onClick={() => openChat(chat.id)} className="w-full text-left p-4 bg-white hover:bg-blue-50 border border-gray-200 rounded-lg transition-colors duration-200 group">
                                                <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 break-words truncate">{chat.title}</h4>
                                                <p className="text-xs text-gray-500">{new Date(chat.createdAt).toLocaleString("pt-BR")}</p>
                                                <p className="text-sm text-gray-600 mt-2 line-clamp-2 break-words">{chat.messages.length > 0 ? chat.messages[chat.messages.length - 1].content : "Conversa sem mensagens"}</p>
                                            </button>
                                        ))
                                    ))
                                }
                            </div>
                        ) : (
                            <>
                                {!activeChat || activeChat.messages.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full space-y-4">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Olá! Como posso ajudar você hoje?</h4>
                                        <div className="w-full space-y-2">
                                            {preMadeQuestions.map((question, index) => (
                                                <button key={index} onClick={() => handleSendMessage(question)} className="w-full text-left px-4 py-3 bg-white hover:bg-blue-50 border border-gray-200 rounded-lg transition-colors duration-200 text-sm text-gray-700 hover:text-blue-600 hover:border-blue-300">{question}</button>
                                            ))}
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        {activeChat.messages.map((msg, index) => (
                                            <div key={index} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                                <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${msg.role === "user" ? "bg-blue-600 text-white rounded-br-none" : "bg-white text-gray-800 rounded-bl-none shadow-sm"}`}>
                                                    <div className="text-sm break-words overflow-wrap-anywhere"><FormattedMessage content={msg.content} /></div>
                                                </div>
                                            </div>
                                        ))}
                                        {isPending && <TypingIndicator />}
                                    </div>
                                )}
                            </>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    {showScrollButton && view === 'chat' && (
                        <button
                            onClick={scrollToBottom}
                            className="absolute bottom-4 left-1/2 border -translate-x-1/2 bg-white/90 backdrop-blur-sm text-blue-600 rounded-full p-2 shadow-lg hover:bg-blue-50 transition-all duration-300"
                            title="Rolar para o final"
                        >
                            <ArrowDown className="w-5 h-5" />
                        </button>
                    )}
                </div>

                {/* Input */}
                {view === "chat" && (
                    <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(message); }} className="p-4 bg-white rounded-b-2xl border-t">
                        <div className="flex gap-2">
                            <Input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Digite sua mensagem..." className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500" disabled={isPending} />
                            <button type="submit" className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" disabled={!message.trim() || isPending}>
                                {isPending ? <Loader2 className="w-5 h-5 animate-spin" /> : <Send className="w-5 h-5" />}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Botão Flutuante */}
            <button
                ref={toggleButtonRef}
                onClick={() => setIsOpen(!isOpen)}
                className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out z-50 hover:scale-110 ${isOpen ? "bg-red-600 hover:bg-red-700" : "bg-blue-600 hover:bg-blue-700"}`}
            >
                {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
            </button>
        </>
    );
}