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
import { useMemo, useState } from "react";

interface Tickets {
    id: string
    title: string
    description: string
    createdAt: string
    evaluatio: string
    status: string
    category: string
    priority: string
}

const tickets: Tickets[] = [
    {
        id: "HP-1212",
        title: "Problema de login",
        description: "Usuário não consegue acessar a conta.",
        createdAt: "2025-03-28T10:00:00Z",
        evaluatio: "Pendente",
        status: "Aberto",
        category: "Suporte Técnico",
        priority: "Alta"
    },
    {
        id: "HP-1242",
        title: "Erro na funcionalidade de pagamento",
        description: "O sistema não processa os pagamentos corretamente.",
        createdAt: "2025-03-27T14:30:00Z",
        evaluatio: "Em andamento",
        status: "Em progresso",
        category: "Financeiro",
        priority: "Média"
    },
    {
        id: "HP-0000",
        title: "Falha na exibição do dashboard",
        description: "O dashboard não carrega as informações corretamente.",
        createdAt: "2025-03-26T09:00:00Z",
        evaluatio: "Pendente",
        status: "Aberto",
        category: "Desenvolvimento",
        priority: "Baixa"
    },
    {
        id: "HP-1123",
        title: "Solicitação de aumento de recursos",
        description: "Requisição para aumentar o limite de armazenamento.",
        createdAt: "2025-03-25T12:45:00Z",
        evaluatio: "Aprovado",
        status: "Fechado",
        category: "Infraestrutura",
        priority: "Média"
    },
    {
        id: "HP-1902",
        title: "Bug na interface do usuário",
        description: "Botões não estão sendo exibidos corretamente.",
        createdAt: "2025-03-24T16:20:00Z",
        evaluatio: "Em andamento",
        status: "Em progresso",
        category: "Design",
        priority: "Alta"
    },
];


function getDate(date: string) {
    return new Date(date).toLocaleDateString();
}

const getStatusClasses = (status: string) => {
    const baseClasses = 'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border';

    switch (status.toLowerCase()) {
        case 'aberto':
            return `${baseClasses} border-blue-500 text-blue-700 bg-blue-100`;
        case 'em progresso':
            return `${baseClasses} border-yellow-500 text-yellow-700 bg-yellow-100`;
        case 'fechado':
            return `${baseClasses} border-green-500 text-green-700 bg-green-100`;
        default:
            return `${baseClasses} border-gray-500 text-gray-700 bg-gray-100`;
    }
};



const getPriorityColor = (priority: string) => {
    switch (priority.toLowerCase()) {
        case 'alta':
            return 'bg-red-600';
        case 'média':
            return 'bg-yellow-500';
        case 'baixa':
            return 'bg-green-700';
        default:
            return 'bg-gray-500';
    }
};

export function TicketsDashboard() {
    const { user } = useAuth();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [priorityFilter, setPriorityFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');

    const filteredTickets = useMemo(() => {
        return tickets.filter(ticket => {
            const searchLower = searchTerm.toLowerCase();
            const ticketPriority = ticket.priority.toLowerCase();
            const ticketStatus = ticket.status.toLowerCase();

            const matchesSearch = searchTerm === '' ||
                ticket.title.toLowerCase().includes(searchLower) ||
                ticket.description.toLowerCase().includes(searchLower) ||
                ticket.id.toLowerCase().includes(searchLower) ||
                getDate(ticket.createdAt).toLowerCase().includes(searchLower);

            const matchesPriority = priorityFilter === 'all' ||
                ticketPriority === priorityFilter.toLowerCase();

            const matchesStatus = statusFilter === 'all' ||
                ticketStatus === statusFilter.toLowerCase();

            return matchesSearch && matchesPriority && matchesStatus;
        });
    }, [searchTerm, priorityFilter, statusFilter]);


    const summaryCounts = useMemo(() => {
        return {
            open: tickets.filter(t => t.status === 'Aberto').length,
            inProgress: tickets.filter(t => t.status === 'Em progresso').length,
            closed: tickets.filter(t => t.status === 'Fechado').length,
        };
    }, []);

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
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                            <div className="absolute left-0 top-0 h-full flex items-center px-2">
                                <Search className="text-gray-400" />
                            </div>
                        </div>

                        <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Prioridade" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todas</SelectItem>
                                <SelectItem value="Alta">Alta</SelectItem>
                                <SelectItem value="Média">Média</SelectItem>
                                <SelectItem value="Baixa">Baixa</SelectItem>
                            </SelectContent>
                        </Select>

                        <Select value={statusFilter} onValueChange={setStatusFilter}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">Todos</SelectItem>
                                <SelectItem value="Aberto">Aberto</SelectItem>
                                <SelectItem value="Em progresso">Em progresso</SelectItem>
                                <SelectItem value="Fechado">Fechado</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col xl:flex-row gap-2 mt-4">
                        <div className="w-full xl:w-2/3 space-y-4">
                            {filteredTickets.length > 0 ? (
                                filteredTickets.map((ticket) => (
                                    <div key={ticket.id} className="w-full border border-zinc-300 rounded-md p-4">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="flex gap-2 items-center">
                                                    <h1 className="text-lg font-semibold">{ticket.title}</h1>
                                                    <Badge className={`${getPriorityColor(ticket.priority)}`}>
                                                        {ticket.priority}
                                                    </Badge>
                                                </div>
                                                <p className="text-sm text-gray-500">{ticket.description}</p>
                                            </div>
                                            <div>
                                                <Badge className={getStatusClasses(ticket.status)}>
                                                    {ticket.status}
                                                </Badge>
                                            </div>
                                        </div>

                                        <div className="flex justify-between">
                                            <div className="mt-2 flex items-center gap-2">
                                                <MessageCircle className="text-blue-600 w-5 h-5" />
                                                <span>2 respostas</span>
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
        </>
    )
}