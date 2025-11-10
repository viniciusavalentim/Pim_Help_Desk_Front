import { Badge } from "@/components/ui/badge"
import { getCategoryEnumFromString, getCategoryInPortuguese, getCategoryStringFromEnum, getPriorityInPortuguese } from "@/helper/enums"
import { getDate, getPriorityColor } from "@/pages/app/requester/dashboard"
import { Ticket } from "@/utils/types"
import { Eye } from "lucide-react"

interface TicketsTableProps {
    tickets: Ticket[]
}

export function TicketsTable({ tickets }: TicketsTableProps) {
    if (tickets.length === 0) {
        return (
            <div className="flex items-center justify-center py-12">
                <p className="text-muted-foreground">Nenhum chamado encontrado</p>
            </div>
        )
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full">
                <thead>
                    <tr className="border-b border-border">
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">ID</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Cliente</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Assunto</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Data/Fechamento</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Categoria</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Prioridade</th>
                        <th className="px-4 py-3 text-left text-sm font-medium text-muted-foreground">Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {tickets.map((ticket, index) => (
                        <tr
                            key={ticket.id}
                            className={`border-b border-border transition-colors hover:bg-muted/50 ${index % 2 === 0 ? "bg-background" : "bg-muted/20"
                                }`}
                        >
                            <td className="px-4 py-4 text-sm font-medium text-foreground">{ticket.id.slice(0, 4)}</td>
                            <td className="px-4 py-4 text-sm text-foreground">{ticket.requester?.name}</td>
                            <td className="px-4 py-4 text-sm text-foreground max-w-xs truncate">{ticket.description}</td>
                            <td className="px-4 py-4 text-sm text-muted-foreground">{getDate(ticket.createdAt)}</td>
                            <td className="px-4 py-4">
                                {/* <span
                                    className={`inline-block rounded-full px-3 py-1 text-xs font-medium ${getCate(
                                        ticket.category,
                                    )}`}
                                >
                                    {ticket.category}
                                </span> */}
                                {getCategoryInPortuguese(ticket.category)}
                            </td>
                            <td className="px-4 py-4">
                                <Badge className={`${getPriorityColor(ticket.priority)}`}>
                                    {getPriorityInPortuguese(ticket.priority)}
                                </Badge>
                            </td>
                            <td className="px-4 py-4">
                                <button className="inline-flex items-center justify-center p-2 text-muted-foreground hover:text-foreground transition-colors">
                                    <Eye className="h-4 w-4" />
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}
