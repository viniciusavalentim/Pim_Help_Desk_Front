import { getCategoryInPortuguese, getPriorityInPortuguese } from "@/helper/enums"
import { Ticket } from "@/utils/types"

export function exportToExcel(tickets: Ticket[], filename = "tickets-report") {
    // Create CSV content
    const headers = ["ID", "Cliente", "Assunto", "Data/Fechamento", "Categoria", "Prioridade", "Tempo", "Avaliação"]

    const rows = tickets.map((ticket) => [
        ticket.id,
        ticket.requester?.name,
        ticket.title,
        ticket.description,
        ticket.createdAt,
        getCategoryInPortuguese(ticket.category),
        getPriorityInPortuguese(ticket.priority),
    ])

    // Create CSV string
    const csvContent = [
        headers.join(","),
        ...rows.map((row) =>
            row
                .map((cell) => {
                    const cellStr = String(cell)
                    return cellStr.includes(",") ? `"${cellStr.replace(/"/g, '""')}"` : cellStr
                })
                .join(","),
        ),
    ].join("\n")

    const uint8Array = new TextEncoder().encode(csvContent)
    const blob = new Blob([uint8Array], { type: "text/csv;charset=utf-8;" })

    // Create download link
    const link = document.createElement("a")
    const url = URL.createObjectURL(blob)
    link.setAttribute("href", url)
    link.setAttribute("download", `${filename}.csv`)
    link.style.visibility = "hidden"

    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // Clean up
    URL.revokeObjectURL(url)
}
