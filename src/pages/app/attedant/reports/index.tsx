import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, FileText, Clock, ChevronDown } from "lucide-react"
import { useQuery } from "@tanstack/react-query"
import { GetTickets } from "@/api/tickets/FindTickets"
import { TicketsTable } from "./components/tickets-table"
import { exportToPDF } from "./components/export-pdf"
import { toast } from "sonner"
import { exportToExcel } from "./components/export-csv"

export function Reports() {
    const [searchTerm, setSearchTerm] = useState("")
    const [priorityFilter, setPriorityFilter] = useState<string>("all")
    const [categoryFilter, setCategoryFilter] = useState<string>("all")
    const [showExportMenu, setShowExportMenu] = useState(false)
    const exportMenuRef = useRef<HTMLDivElement>(null)

    const { data: tickets, isLoading, refetch } = useQuery({
        queryKey: ["FindQueryTicketsUser"],
        queryFn: () => GetTickets({}),
    });

    const totalTickets = tickets?.tickets.length
    const averageTime = "2h 29min"
    const averageRating = 4.3

    const handleExportExcel = () => {
        if (!tickets?.tickets) {
            toast.error("Sem tickets");
            return
        }
        exportToExcel(tickets?.tickets, "tickets-report")
        setShowExportMenu(false)
    }

    const handleExportPDF = () => {
        if (!tickets?.tickets) {
            toast.error("Sem tickets");
            return
        }
        exportToPDF(tickets.tickets, "tickets-report")
        setShowExportMenu(false)
    }

    return (
        <div>
            {/* Header */}
            <header className="border-b border-border ">
                <div className=" px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground">Relatórios</h1>
                            <p className="mt-1 text-sm text-muted-foreground">Visualize e analise todos chamados</p>
                        </div>
                        <div className="relative" ref={exportMenuRef}>
                            <Button
                                onClick={() => setShowExportMenu(!showExportMenu)}
                                className="flex items-center gap-2 bg-primary text-primary-foreground hover:opacity-90"
                            >
                                <Download className="h-4 w-4" />
                                Exportar
                                <ChevronDown className="h-4 w-4" />
                            </Button>

                            {showExportMenu && (
                                <div className="absolute right-0 mt-2 w-48 rounded-lg border border-border bg-card shadow-lg">
                                    <button
                                        onClick={handleExportExcel}
                                        className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-foreground hover:bg-muted"
                                    >
                                        <FileText className="h-4 w-4" />
                                        Exportar para Excel
                                    </button>
                                    <button
                                        onClick={handleExportPDF}
                                        className="flex w-full items-center gap-3 border-t border-border px-4 py-3 text-left text-sm text-foreground hover:bg-muted"
                                    >
                                        <FileText className="h-4 w-4" />
                                        Exportar para PDF
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className=" px-4 py-8 sm:px-6 lg:px-8">
                {/* Metrics */}
                <div className="mb-8 grid gap-4 sm:grid-cols-3">
                    <Card className="border-border bg-card">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Total de Chamados</CardTitle>
                            <FileText className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">{totalTickets}</div>
                            <p className="text-xs text-muted-foreground">Últimos 30 dias</p>
                        </CardContent>
                    </Card>

                    <Card className="border-border bg-card">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Tempo Médio</CardTitle>
                            <Clock className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">{averageTime}</div>
                            <p className="text-xs text-muted-foreground">Por chamado</p>
                        </CardContent>
                    </Card>
                    {/* 
                    <Card className="border-border bg-card">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">Avaliação Média</CardTitle>
                            <TrendingUp className="h-4 w-4 text-primary" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-foreground">{averageRating}/5</div>
                            <p className="text-xs text-muted-foreground">Satisfação do cliente</p>
                        </CardContent>
                    </Card> */}
                </div>

                {/* Filters */}
                {/* <Card className="mb-8 border-border bg-card">
                    <CardHeader>
                        <CardTitle className="text-lg">Filtros</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
                            <div className="flex-1">
                                <label className="mb-2 block text-sm font-medium text-foreground">Buscar</label>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                                    <Input
                                        placeholder="ID, cliente ou assunto..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        className="pl-10"
                                    />
                                </div>
                            </div>

                            <div className="flex-1">
                                <label className="mb-2 block text-sm font-medium text-foreground">Prioridade</label>
                                <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Todas as prioridades" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todas as prioridades</SelectItem>
                                        <SelectItem value="Baixa">Baixa</SelectItem>
                                        <SelectItem value="Média">Média</SelectItem>
                                        <SelectItem value="Alta">Alta</SelectItem>
                                        <SelectItem value="Crítica">Crítica</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="flex-1">
                                <label className="mb-2 block text-sm font-medium text-foreground">Categoria</label>
                                <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Todas as categorias" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="all">Todas as categorias</SelectItem>
                                        <SelectItem value="Sistemas">Sistemas</SelectItem>
                                        <SelectItem value="Email">Email</SelectItem>
                                        <SelectItem value="Hardware">Hardware</SelectItem>
                                        <SelectItem value="Software">Software</SelectItem>
                                        <SelectItem value="Rede">Rede</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <Button
                                onClick={() => {
                                    setSearchTerm("")
                                    setPriorityFilter("all")
                                    setCategoryFilter("all")
                                }}
                                variant="outline"
                            >
                                Limpar
                            </Button>
                        </div>
                    </CardContent>
                </Card> */}

                {/* Table */}
                <Card className="border-border bg-card">
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle className="text-lg">Chamados ({tickets?.tickets.length})</CardTitle>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <TicketsTable tickets={tickets?.tickets ?? []} />
                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
