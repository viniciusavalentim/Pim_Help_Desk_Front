import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"


export function TicketsDashboard() {
    return (
        <>
            <div className="p-4 md:p-6 space-y-6">
                <header>
                    <h1 className="text-zinc-900 text-3xl font-bold">Central de Chamados</h1>
                    <h1 className="text-zinc-500 text-lg">Gerencie todos os seus chamados por aqui </h1>
                </header>
                <main>
                    <div className="flex justify-between items-center">
                        <h1 className="text-zinc-800 text-2xl font-semibold">Meus chamados</h1>
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
                </main>
            </div>
        </>
    )
}