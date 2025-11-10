import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle, Clock, MessageCircle, Plus, Search, SquareArrowOutUpRight } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { GetTickets, GetTicketsParams } from "@/api/tickets/FindTickets";
import { getPriorityInPortuguese, getPriorityStringFromEnum, getStatusTicketInPortuguese, getStatusTicketStringFromEnum } from "@/helper/enums";
import { PriorityEnum, StatusTicketEnum } from "@/utils/types";
import { Skeleton } from "@/components/ui/skeleton";
import FloatingChat from "../components/floating-chat";

export function getDate(date: string) {
    return new Date(date).toLocaleDateString();
}

export const getStatusClasses = (status: StatusTicketEnum) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';

    const statusString = getStatusTicketStringFromEnum(status);
    switch (statusString ? statusString.toLowerCase() : "") {
        case 'pending':
            return `${baseClasses} border-blue-500 text-blue-700 bg-blue-100`;
        case 'in_progress':
            return `${baseClasses} border-yellow-500 text-yellow-700 bg-yellow-100`;
        case 'resolved':
            return `${baseClasses} border-green-500 text-green-700 bg-green-100`;
        case 'canceled':
            return `${baseClasses} border-red-500 text-red-700 bg-red-100`;
        default:
            return `${baseClasses} border-gray-500 text-gray-700 bg-gray-100`;
    }
};

export const getPriorityColor = (priority: PriorityEnum) => {

    const priorityString = getPriorityStringFromEnum(priority);

    switch (priorityString) {
        case 'high':
            return 'bg-red-600';
        case 'medium':
            return 'bg-yellow-500';
        case 'low':
            return 'bg-green-700';
        default:
            return 'bg-gray-500';
    }
};

export function TicketsDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [filters, setFilters] = useState<Partial<GetTicketsParams>>({});

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, type: string) => {
        setFilters(prev => ({ ...prev, [type]: e.target.value }));
    };

    const handleSelectChange = (name: 'status' | 'priority', value: string) => {
        setFilters(prev => ({ ...prev, [name]: value }));
    };

    const { data: tickets, isLoading } = useQuery({
        queryKey: ["FindTicketsUser", filters],
        queryFn: () => {
            const cleanFilters: Partial<GetTicketsParams> = {};
            Object.entries(filters).forEach(([key, value]) => {
                if (value) {
                    cleanFilters[key as keyof GetTicketsParams] = value;
                }
            });
            return GetTickets(cleanFilters);
        },
        placeholderData: (previousData) => previousData,
    });

    const summaryCounts = useMemo(() => {
        return {
            open: tickets?.tickets.filter(t => getStatusTicketStringFromEnum(t.status) === 'Aberto').length,
            inProgress: tickets?.tickets.filter(t => getStatusTicketStringFromEnum(t.status) === 'in_progress').length,
            closed: tickets?.tickets.filter(t => getStatusTicketStringFromEnum(t.status) === 'Fechado').length,
        };
    }, []);

    useEffect(() => {
        setFilters({
            requesterId: user?.id
        })
    }, [user])

    return (
        <>
            <div className="p-4 md:p-6 space-y-6">
                <header>
                    <h1 className="text-zinc-900 text-2xl font-bold">Central de Chamados</h1>
                    <h1 className="text-zinc-500 text-lg">Gerencie todos os seus chamados por aqui <span className="italic">{user?.name}</span></h1>
                </header>
                <main>
                    <div className="flex justify-between items-center">
                        <h1 className="text-zinc-800 text-xl font-semibold">Meus chamados</h1>
                        <Button className="cursor-pointer" onClick={() => navigate("novo-chamado")}>
                            Novo Chamado <Plus className="text-white" />
                        </Button>
                    </div>

                    <div className="mt-2 flex items-center gap-2 w-full">
                        <div className="relative w-full">
                            <Input
                                placeholder="Pesquisar por título, descrição, ID ou data..."
                                className="pl-10"
                                value={filters.searchText} onChange={(e) => handleInputChange(e, "searchText")}
                            />
                            <div className="absolute left-0 top-0 h-full flex items-center px-2">
                                <Search className="text-gray-400" />
                            </div>
                        </div>

                        <Select value={filters.priority} onValueChange={(e) => handleSelectChange("priority", e)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Prioridade" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas</SelectItem>
                                <SelectItem value="1">Alta</SelectItem>
                                <SelectItem value="2">Média</SelectItem>
                                <SelectItem value="3">Baixa</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={filters.status} onValueChange={(e) => handleSelectChange("status", e)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="1">Aberto</SelectItem>
                                <SelectItem value="2">Em Andamento</SelectItem>
                                <SelectItem value="3">Fechado</SelectItem>
                                <SelectItem value="4">Cancelado</SelectItem>

                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col xl:flex-row gap-2 mt-4">
                        <div className="w-full xl:w-2/3 space-y-4">
                            {isLoading ? (<>
                                <div className="w-full xl:w-full space-y-4">
                                    {[...Array(3)].map((_, i) => (
                                        <Skeleton className="h-30 w-full bg-gray-100 border border-gray-200" key={i.toString()} />
                                    ))}
                                </div>
                            </>
                            ) : (
                                <>
                                    {tickets && tickets?.tickets && tickets?.tickets.length > 0 ? (
                                        tickets?.tickets.map((ticket) => (
                                            <div key={ticket.id} className="w-full border border-zinc-300 rounded-md p-4">
                                                <div className="flex items-center justify-between">
                                                    <div>
                                                        <div className="flex gap-2 items-center">
                                                            <h1 className="text-lg font-semibold">{ticket.title}</h1>
                                                            <Badge className={`${getPriorityColor(ticket.priority)}`}>
                                                                {getPriorityInPortuguese(ticket.priority)}
                                                            </Badge>
                                                        </div>
                                                        <p className="text-sm text-gray-500">{ticket.description}</p>
                                                    </div>
                                                    <div>
                                                        <Badge className={getStatusClasses(ticket.status)}>
                                                            {getStatusTicketInPortuguese(ticket.status)}
                                                        </Badge>
                                                    </div>
                                                </div>

                                                <div className="flex justify-between">
                                                    <div className="mt-2 flex items-center gap-2">
                                                        <MessageCircle className="text-blue-600 w-5 h-5" />
                                                        <span>{ticket.ticketResponses?.length} respostas</span>
                                                        {getDate(ticket.createdAt)}
                                                    </div>
                                                    <div>
                                                        <Button
                                                            className="h-7 w-30 text-xs"
                                                            onClick={() => navigate("ticket/" + ticket.id)}
                                                            variant={"outline"}
                                                        >
                                                            Ver Detalhes
                                                        </Button>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="w-full border border-zinc-300 rounded-md p-4 text-center">
                                            <p>Nenhum chamado encontrado com os filtros selecionados.</p>
                                        </div> 
                                    )}
                                </>
                            )}
                        </div>

                        <div className="w-full xl:w-1/3">
                            <div className="w-full border border-zinc-300 rounded-md p-4">
                                <h1 className="font-semibold">Resumo dos seus Chamados</h1>

                                <div className="space-y-6 mt-4">
                                    <div className="flex justify-between items-center px-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="bg-blue-500/20 rounded-full w-10 h-10 flex justify-center items-center">
                                                <SquareArrowOutUpRight className="text-blue-500" />
                                            </div>
                                            <h2>Em aberto</h2>
                                        </div>
                                        <p>{summaryCounts.open}</p>
                                    </div>
                                    <div className="flex justify-between items-center px-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="bg-yellow-400/20 rounded-full w-10 h-10 flex justify-center items-center">
                                                <Clock className="text-yellow-400" />
                                            </div>
                                            <h2>Em progresso</h2>
                                        </div>
                                        <p>{summaryCounts.inProgress}</p>
                                    </div>
                                    <div className="flex justify-between items-center px-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="bg-green-500/20 rounded-full w-10 h-10 flex justify-center items-center">
                                                <CheckCircle className="text-green-500" />
                                            </div>
                                            <h2>Fechados</h2>
                                        </div>
                                        <p>{summaryCounts.closed}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
            <FloatingChat />
        </>
    )
}