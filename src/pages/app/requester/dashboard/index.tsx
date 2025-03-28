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
    }
];


function getDate(date: string) {
    return new Date(date).toLocaleDateString();
}

export function TicketsDashboard() {

    const navigate = useNavigate();


    return (
        <>
            <div className="p-4 md:p-6 space-y-6">
                <header>
                    <h1 className="text-zinc-900 text-2xl font-bold">Central de Chamados</h1>
                    <h1 className="text-zinc-500 text-lg">Gerencie todos os seus chamados por aqui </h1>
                </header>
                <main>
                    <div className="flex justify-between items-center">
                        <h1 className="text-zinc-800 text-xl font-semibold">Meus chamados</h1>
                        <Button className="cursor-pointer">Novo Chamado <Plus className="text-white" /></Button>
                    </div>
                    <div className="mt-2 flex items-center gap-2 w-full">
                        <div className="relative w-full">
                            <Input placeholder="Pesquisar chamados..." className="pl-10" />
                            <div className="absolute left-0 top-0 h-full flex items-center px-2">
                                <Search className="text-gray-400" />
                            </div>
                        </div>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Prioridade" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="light">Light</SelectItem>
                                <SelectItem value="dark">Dark</SelectItem>
                                <SelectItem value="system">System</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex flex-col xl:flex-row gap-2 mt-2">
                        <div className="w-full xl:w-2/3 space-y-4">
                            {tickets.map((ticket) => (
                                <div className="w-full border border-zinc-300 rounded-md p-4">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <div className="flex gap-2 items-center">
                                                <h1 className="text-lg font-semibold">{ticket.title}</h1>
                                                <Badge>{ticket.priority}</Badge>
                                            </div>
                                            <p className="text-sm text-gray-500">{ticket.description}</p>
                                        </div>
                                        <div>
                                            <Badge>{ticket.status}</Badge>
                                        </div>
                                    </div>

                                    <div className="flex justify-between">
                                        <div className="mt-2 flex items-center gap-2">
                                            <MessageCircle className="text-blue-600 w-5 h-5" />
                                            <span>2 respostas</span>
                                            {getDate(ticket.createdAt)}
                                        </div>
                                        <div>
                                            <Button onClick={() => navigate("ticket/" + ticket.id)} variant={"outline"}>Ver Detalhes</Button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-full xl:w-1/3">
                            <div className="w-full border border-zinc-300 rounded-md p-4">
                                <h1 className="">Resumo dos seus Chamados</h1>

                                <div className="space-y-6 mt-4">
                                    <div className=" flex justify-between items-center px-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="bg-primary/20 rounded-full w-10 h-10 flex justify-center items-center">
                                                <SquareArrowOutUpRight className="text-primary" />
                                            </div>
                                            <h2>Em abertos</h2>
                                        </div>
                                        <p>200</p>
                                    </div>
                                    <div className=" flex justify-between items-center px-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="bg-yellow-400/20 rounded-full w-10 h-10 flex justify-center items-center">
                                                <Clock className="text-yellow-400" />
                                            </div>
                                            <h2>Pendentes</h2>
                                        </div>
                                        <p>200</p>
                                    </div>
                                    <div className=" flex justify-between items-center px-2">
                                        <div className="flex gap-2 items-center">
                                            <div className="bg-green-500/20 rounded-full w-10 h-10 flex justify-center items-center">
                                                <CheckCircle className="text-green-500" />
                                            </div>
                                            <h2>Pendentes</h2>
                                        </div>
                                        <p>200</p>
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