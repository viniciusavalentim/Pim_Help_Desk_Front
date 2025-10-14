import type React from "react"

import { useState, useEffect, useRef } from "react"
import { MessageCircle, X, Send, ArrowLeft, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"

type Message = {
    id: number
    text: string
    sender: string
    time: string
}

type ChatSession = {
    id: string
    title: string
    messages: Message[]
    createdAt: string
}

export default function FloatingChat() {
    const [isOpen, setIsOpen] = useState(false)
    const [message, setMessage] = useState("")
    const [view, setView] = useState<"list" | "chat">("list")
    const [chatSessions, setChatSessions] = useState<ChatSession[]>([]) 
    const [activeChatId, setActiveChatId] = useState<string | null>(null) 

    const chatRef = useRef<HTMLDivElement>(null)

    const preMadeQuestions = [
        "Como faço para redefinir minha senha?",
        "Como entro em contato com o suporte?",
        "Quais são os horários de atendimento?",
    ]

    const activeChat = chatSessions.find((chat) => chat.id === activeChatId)

    const toggleChat = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (chatRef.current && !chatRef.current.contains(event.target as Node) && isOpen) {
                setIsOpen(false)
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [isOpen])

    const createNewChat = () => {
        const newChatId = `chat-${Date.now()}`
        const newChat: ChatSession = {
            id: newChatId,
            title: "Nova Conversa",
            messages: [],
            createdAt: new Date().toLocaleString("pt-BR"),
        }
        setChatSessions([newChat, ...chatSessions])
        setActiveChatId(newChatId)
        setView("chat")
    }

    const openChat = (chatId: string) => {
        setActiveChatId(chatId)
        setView("chat")
    }

    const goBackToList = () => {
        setView("list")
    }

    const handleQuestionClick = (question: string) => {
        if (!activeChatId) {
            createNewChat()
        }

        const newMessage: Message = {
            id: Date.now(),
            text: question,
            sender: "user",
            time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
        }

        setChatSessions((prev) =>
            prev.map((chat) => {
                if (chat.id === activeChatId) {
                    const updatedMessages = [...chat.messages, newMessage]
                    return {
                        ...chat,
                        messages: updatedMessages,
                        title: question.substring(0, 30) + (question.length > 30 ? "..." : ""),
                    }
                }
                return chat
            }),
        )

        // Simular resposta do bot
        setTimeout(() => {
            const botResponse: Message = {
                id: Date.now() + 1,
                text: "Obrigado pela sua pergunta! Nossa equipe de suporte está analisando seu caso e retornará em breve com uma solução personalizada.",
                sender: "bot",
                time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
            }
            setChatSessions((prev) =>
                prev.map((chat) => (chat.id === activeChatId ? { ...chat, messages: [...chat.messages, botResponse] } : chat)),
            )
        }, 1000)
    }

    const handleSendMessage = (e: React.FormEvent) => {
        e.preventDefault()
        if (message.trim()) {
            if (!activeChatId) {
                const newChatId = `chat-${Date.now()}`
                const newChat: ChatSession = {
                    id: newChatId,
                    title: message.substring(0, 30) + (message.length > 30 ? "..." : ""),
                    messages: [],
                    createdAt: new Date().toLocaleString("pt-BR"),
                }
                setChatSessions([newChat, ...chatSessions])
                setActiveChatId(newChatId)
            }

            const newMessage: Message = {
                id: Date.now(),
                text: message,
                sender: "user",
                time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
            }

            setChatSessions((prev) =>
                prev.map((chat) => {
                    if (chat.id === activeChatId) {
                        const updatedMessages = [...chat.messages, newMessage]
                        return {
                            ...chat,
                            messages: updatedMessages,
                            title:
                                chat.title === "Nova Conversa"
                                    ? message.substring(0, 30) + (message.length > 30 ? "..." : "")
                                    : chat.title,
                        }
                    }
                    return chat
                }),
            )

            setMessage("")

            // Simular resposta do bot
            setTimeout(() => {
                const botResponse: Message = {
                    id: Date.now() + 1,
                    text: "Recebi sua mensagem! Estou processando sua solicitação e retornarei com uma resposta detalhada em instantes.",
                    sender: "bot",
                    time: new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
                }
                setChatSessions((prev) =>
                    prev.map((chat) =>
                        chat.id === activeChatId ? { ...chat, messages: [...chat.messages, botResponse] } : chat,
                    ),
                )
            }, 1000)
        }
    }

    return (
        <>
            <div
                ref={chatRef}
                className={`fixed bottom-24 right-6 w-96 bg-white rounded-2xl shadow-2xl transition-all duration-300 ease-in-out z-50 ${isOpen ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-95 translate-y-4 pointer-events-none"
                    }`}
            >
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-t-2xl p-4 flex items-center gap-3">
                    {view === "chat" && (
                        <button onClick={goBackToList} className="text-white hover:bg-blue-500 rounded-full p-1 transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                        </button>
                    )}
                    <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center">
                        <MessageCircle className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="flex-1">
                        <h3 className="text-white font-semibold">
                            {view === "list" ? "Central de Atendimento" : activeChat?.title || "Assistente Virtual"}
                        </h3>
                        <p className="text-blue-100 text-sm">{view === "list" ? "Suas conversas" : "Online - Resposta rápida"}</p>
                    </div>
                    {view === "list" && (
                        <button
                            onClick={createNewChat}
                            className="text-white hover:bg-blue-500 rounded-full p-2 transition-colors"
                            title="Nova conversa"
                        >
                            <Plus className="w-5 h-5" />
                        </button>
                    )}
                </div>

                <div className="h-96 overflow-y-auto p-4 bg-gray-50">
                    {view === "list" ? (
                        <div className="space-y-3">
                            {chatSessions.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center py-12">
                                    <MessageCircle className="w-16 h-16 text-gray-300 mb-4" />
                                    <h4 className="text-lg font-semibold text-gray-700 mb-2">Nenhuma conversa ainda</h4>
                                    <p className="text-sm text-gray-500 mb-4">Inicie uma nova conversa para começar</p>
                                    <button
                                        onClick={createNewChat}
                                        className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                                    >
                                        Iniciar Conversa
                                    </button>
                                </div>
                            ) : (
                                chatSessions.map((chat) => (
                                    <button
                                        key={chat.id}
                                        onClick={() => openChat(chat.id)}
                                        className="w-full text-left p-4 bg-white hover:bg-blue-50 border border-gray-200 rounded-lg transition-colors duration-200 group"
                                    >
                                        <h4 className="font-semibold text-gray-800 mb-1 group-hover:text-blue-600 break-words">
                                            {chat.title}
                                        </h4>
                                        <p className="text-xs text-gray-500">{chat.createdAt}</p>
                                        <p className="text-sm text-gray-600 mt-2 line-clamp-2 break-words">
                                            {chat.messages.length > 0
                                                ? chat.messages[chat.messages.length - 1].text
                                                : "Conversa sem mensagens"}
                                        </p>
                                    </button>
                                ))
                            )}
                        </div>
                    ) : (
                        // Active Chat View
                        <>
                            {!activeChat || activeChat.messages.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full space-y-4">
                                    <div className="text-center mb-4">
                                        <h4 className="text-lg font-semibold text-gray-800 mb-2">Olá! Como posso ajudar você hoje?</h4>
                                        <p className="text-sm text-gray-600">
                                            Escolha uma das opções abaixo ou digite sua própria mensagem para começar
                                        </p>
                                    </div>

                                    <div className="w-full space-y-2">
                                        {preMadeQuestions.map((question, index) => (
                                            <button
                                                key={index}
                                                onClick={() => handleQuestionClick(question)}
                                                className="w-full text-left px-4 py-3 bg-white hover:bg-blue-50 border border-gray-200 rounded-lg transition-colors duration-200 text-sm text-gray-700 hover:text-blue-600 hover:border-blue-300"
                                            >
                                                {question}
                                            </button>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-2 mt-4 w-full">
                                        <div className="h-px bg-gray-300 flex-1"></div>
                                        <span className="text-xs text-gray-500">ou digite sua mensagem</span>
                                        <div className="h-px bg-gray-300 flex-1"></div>
                                    </div>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {activeChat.messages.map((msg) => (
                                        <div key={msg.id} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                                            <div
                                                className={`max-w-[75%] rounded-2xl px-4 py-2 ${msg.sender === "user"
                                                        ? "bg-blue-600 text-white rounded-br-none"
                                                        : "bg-white text-gray-800 rounded-bl-none shadow-sm"
                                                    }`}
                                            >
                                                <p className="text-sm break-words overflow-wrap-anywhere">{msg.text}</p>
                                                <span
                                                    className={`text-xs mt-1 block ${msg.sender === "user" ? "text-blue-100" : "text-gray-500"}`}
                                                >
                                                    {msg.time}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </>
                    )}
                </div>

                {/* Input - only show in chat view */}
                {view === "chat" && (
                    <form onSubmit={handleSendMessage} className="p-4 bg-white rounded-b-2xl border-t">
                        <div className="flex gap-2">
                            <Input
                                type="text"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                placeholder="Digite sua mensagem..."
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent break-words"
                            />
                            <button
                                type="submit"
                                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                disabled={!message.trim()}
                            >
                                <Send className="w-5 h-5" />
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Floating Button */}
            <button
                onClick={toggleChat}
                className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 ease-in-out z-50 hover:scale-110 ${isOpen ? "bg-red-600 hover:bg-red-700 rotate-90" : "bg-blue-600 hover:bg-blue-700 rotate-0"
                    }`}
            >
                {isOpen ? <X className="w-6 h-6 text-white" /> : <MessageCircle className="w-6 h-6 text-white" />}
            </button>
        </>
    )
}
