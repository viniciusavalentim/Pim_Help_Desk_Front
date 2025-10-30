import { AcceptTicket } from "@/api/tickets/acceptTicket";
import { FinishTicket } from "@/api/tickets/finishTicket";
import { ResponseTicket } from "@/api/tickets/responseTicket";
import { GetTickets } from "@/api/tickets/FindTickets";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/AuthContext";
import { getPriorityInPortuguese, getStatusTicketInPortuguese } from "@/helper/enums";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Search, Headphones } from "lucide-react";
import { JSXElementConstructor, Key, ReactElement, ReactNode, ReactPortal, useEffect, useState } from "react";
import { toast } from "sonner";

export function AtendentePage() {
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState("");
    const [attedantTicket, setAttendantTicket] = useState<boolean>(false);
    const [activeTicket, setActiveTicket] = useState<any | null>(null);
    const [responseText, setResponseText] = useState("");

    const { data: tickets, isLoading, refetch } = useQuery({
        queryKey: ["FindQueryTicketsUser"],
        queryFn: () => GetTickets({}),
    });

    const { mutateAsync: acceptTicketFn } = useMutation({
        mutationFn: AcceptTicket,
        onSuccess(data) {
            toast.success(data.message);
            setAttendantTicket(true);
            refetch();
        },
        onError(err) {
            toast.error("Não foi possível aceitar o chamado");
            console.error(err);
        },
    });

    // RESPONDER CHAMADO
    const { mutateAsync: responseTicketFn } = useMutation({
        mutationFn: ResponseTicket,
        onSuccess(data) {
            toast.success("Resposta enviada com sucesso!");
            setResponseText("");
            refetch();
        },
        onError(err) {
            toast.error("Erro ao enviar resposta");
            console.error(err);
        },
    });

    // FINALIZAR CHAMADO
    const { mutateAsync: finishTicketFn } = useMutation({
        mutationFn: FinishTicket,
        onSuccess(data) {
            toast.success(data.message);
            setAttendantTicket(false);
            setActiveTicket(null);
            refetch();
        },
        onError(err) {
            toast.error("Erro ao finalizar chamado");
            console.error(err);
        },
    });

    const handleAcceptTicket = async (ticketId: string) => {
        if (!user?.id || !ticketId) {
            toast.error("Id inválido");
            return;
        }

        try {
            await acceptTicketFn({ ticketId, userId: user.id });
        } catch (error) {
            console.error(error);
        }
    };

    const handleResponseTicket = async () => {
        if (!activeTicket || !responseText.trim()) {
            toast.error("Digite uma resposta");
            return;
        }

        await responseTicketFn({
            ticketId: activeTicket.id,
            userId: user?.id ?? "",
            title: responseText,
        });
    };

    const handleFinishTicket = async () => {
        if (!activeTicket) return;
        await finishTicketFn({
            ticketId: activeTicket.id,
            userId: user?.id ?? "",
        });
    };

    // Verifica se o usuário está atendendo algum ticket
    useEffect(() => {
        if (tickets?.tickets && user) {
            const current = tickets.tickets.find((t) => t.attendantId === user.id && t.status != 3);
            if (current) {
                setAttendantTicket(true);
                setActiveTicket(current);
            }
        }
    }, [tickets, user]);

    return (
        <div className="min-h-screen bg-background p-6">
            <div className="mx-auto px-10">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-foreground mb-1">
                        Bem-vindo de volta, {user?.name}!
                    </h1>
                    <p className="text-muted-foreground">Gerencie todos os seus chamados por aqui</p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Left Column - Tickets */}
                    <div className="lg:col-span-2">
                        <Card className="p-6">
                            <h2 className="text-xl font-semibold mb-1">Chamados Disponíveis</h2>
                            <p className="text-sm text-muted-foreground mb-4">
                                Últimos chamados da Little Bird
                            </p>

                            <div className="relative mb-4">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                                <Input
                                    placeholder="Pesquisar chamado..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-10"
                                />
                            </div>

                            <div className="space-y-4">
                                {tickets?.tickets &&
                                    tickets.tickets
                                        .filter((t) =>
                                            t.title.toLowerCase().includes(searchQuery.toLowerCase())
                                        )
                                        .map((ticket) => (
                                            <div key={ticket.id} className=" hover:shadow-md transition-shadow border rounded-lg bg-[#FAF9F6]">
                                                <div className="p-4 flex items-start justify-between mb-3 bg-[#e4e2e2] rounded-t-lg">
                                                    <div className="flex items-center gap-2">
                                                        <span className="font-semibold text-sm">#{ticket.id.slice(0, 4)}</span>
                                                        <Badge variant="destructive" className="text-xs">
                                                            {getPriorityInPortuguese(ticket.priority)}
                                                        </Badge>
                                                    </div>
                                                    <Badge variant="secondary" className="text-xs">
                                                        {getStatusTicketInPortuguese(ticket.status)}
                                                    </Badge>
                                                </div>

                                                <div className="p-4">
                                                    <h3 className="font-semibold mb-2">{ticket.title}</h3>
                                                    <p className="text-sm text-muted-foreground mb-3">
                                                        {ticket.description}
                                                    </p>

                                                    <div className="flex justify-end">
                                                        {ticket.status != 3 && (
                                                            <Button
                                                                size="sm"
                                                                disabled={
                                                                    attedantTicket
                                                                }
                                                                onClick={() => handleAcceptTicket(ticket.id)}
                                                            >
                                                                Atender
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                            </div>
                        </Card>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                        <Card className="p-6">
                            <div className="flex items-center gap-3 mb-6">
                                <Avatar className="h-12 w-12 bg-primary/10">
                                    <AvatarFallback className="text-primary font-semibold">
                                        {user?.name?.[0] ?? "?"}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="font-semibold">{user?.name}</h3>
                                    <p className="text-sm text-muted-foreground">Técnico Júnior</p>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center p-3 bg-secondary rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Chamados Resolvidos</p>
                                    <p className="text-2xl font-bold">24</p>
                                </div>
                                <div className="text-center p-3 bg-secondary rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Tempo médio</p>
                                    <p className="text-lg font-bold">2h 15min</p>
                                </div>
                                <div className="text-center p-3 bg-secondary rounded-lg">
                                    <p className="text-xs text-muted-foreground mb-1">Ramal</p>
                                    <p className="text-2xl font-bold">1313</p>
                                </div>
                            </div>
                        </Card>

                        {/* Chamado em Atendimento */}
                        {!attedantTicket || !activeTicket ? (
                            <Card className="p-6 text-center">
                                <div className="flex flex-col items-center justify-center py-8">
                                    <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                                        <Headphones className="h-8 w-8 text-primary" />
                                    </div>
                                    <h4 className="font-semibold mb-2">Pronto para atender</h4>
                                    <p className="text-sm text-muted-foreground">
                                        Você não está atendendo nenhum chamado no momento.
                                    </p>
                                </div>
                            </Card>
                        ) : (
                            <Card className="p-6 space-y-4">
                                <h3 className="font-semibold text-2xl space-y-2">
                                    <span>
                                        {activeTicket.title}
                                    </span>
                                    <p className="text-sm text-muted-foreground mt-2">{activeTicket.description}</p>
                                </h3>

                                {/* Lista de respostas existentes */}
                                {activeTicket.ticketResponses && activeTicket.ticketResponses.length > 0 ? (
                                    <div className="space-y-3 max-h-64 overflow-y-auto pr-2 rounded-lg p-3 ">
                                        {activeTicket.ticketResponses.map((resp: { id: Key | null | undefined; userId: string | undefined; user: { name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }; createdAt: string | number | Date; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
                                            <div
                                                key={resp.id}
                                                className={`p-3 rounded-lg ${resp.userId === user?.id
                                                    ? "bg-primary/10 border border-primary/20"
                                                    : "bg-muted"
                                                    }`}
                                            >
                                                <div className="flex items-center justify-between mb-1">
                                                    <span className="font-semibold text-sm">{resp.user?.name}</span>
                                                    <span className="text-xs text-muted-foreground">
                                                        {new Date(resp.createdAt).toLocaleString("pt-BR", {
                                                            day: "2-digit",
                                                            month: "2-digit",
                                                            year: "2-digit",
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        })}
                                                    </span>
                                                </div>
                                                <p className="text-sm text-foreground">{resp.description}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-sm text-muted-foreground italic">
                                        Nenhuma resposta ainda.
                                    </p>
                                )}

                                {/* Campo de resposta */}
                                <div className="border-t">
                                    <h1 className="mt-2 font-semibold">Responsa a esse chamado.</h1>
                                </div>
                                <div className="space-y-3">
                                    <Textarea
                                        placeholder="Digite sua resposta..."
                                        value={responseText}
                                        onChange={(e) => setResponseText(e.target.value)}
                                    />

                                    <div className="flex flex-col gap-2">
                                        <Button onClick={handleResponseTicket} disabled={!responseText.trim()}>
                                            Enviar Resposta
                                        </Button>
                                        <Button variant="destructive" onClick={handleFinishTicket}>
                                            Finalizar Chamado
                                        </Button>
                                    </div>
                                </div>
                            </Card>

                        )}
                    </div>
                </div>
            </div >
        </div >
    );
}
