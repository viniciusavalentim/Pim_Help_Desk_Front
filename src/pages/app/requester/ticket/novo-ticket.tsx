import { ArrowLeft, Calendar, Clock, Info, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useNavigate } from "react-router-dom"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/context/AuthContext"

export function NewTicket() {
    const navigate = useNavigate();
    const { user } = useAuth();

    async function handleSubmit() {
        navigate("/app/dashboard/chamado/sucesso")
    }

    return (
        <div className="container mx-auto px-4 py-6 max-w-7xl">
            <div className="text-sm text-gray-600 mb-2">Central de Chamados &gt; Novo Chamado</div>

            <Button className="flex items-center  cursor-pointer my-6" onClick={() => navigate("/app/dashboard")}>
                <ArrowLeft className="h-4 w-4 mr-1" />
                Voltar
            </Button>

            <h1 className="text-2xl font-bold mb-6">Criar Novo Chamado</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Informações do Chamado */}
                <div className="lg:col-span-2">
                    <div className="bg-white rounded-lg border p-6 mb-6">
                        <h2 className="text-lg font-semibold mb-1">Informações do Chamado</h2>
                        <p className="text-sm text-gray-500 mb-4">Preencha os detalhes do seu problema ou solicitação</p>

                        <div className="space-y-4">
                            <div>
                                <label htmlFor="titulo" className="block text-sm font-medium mb-1">
                                    Título do chamado
                                </label>
                                <Input id="titulo" placeholder="Digite o título do chamado" />
                            </div>

                            <div>
                                <label htmlFor="descricao" className="block text-sm font-medium mb-1">
                                    Descrição do Problema/Solicitação
                                </label>
                                <Textarea
                                    id="descricao"
                                    placeholder="Descreva detalhadamente o seu problema"
                                    className="min-h-[210px]"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="categoria" className="block text-sm font-medium mb-1">
                                        Categoria
                                    </label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione uma categoria" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="suporte">Suporte Técnico</SelectItem>
                                            <SelectItem value="infraestrutura">Infraestrutura</SelectItem>
                                            <SelectItem value="software">Software</SelectItem>
                                            <SelectItem value="hardware">Hardware</SelectItem>
                                            <SelectItem value="rede">Rede</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                <div>
                                    <label htmlFor="prioridade" className="block text-sm font-medium mb-1">
                                        Prioridade
                                    </label>
                                    <Select>
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione uma prioridade" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="baixa">Baixa</SelectItem>
                                            <SelectItem value="media">Média</SelectItem>
                                            <SelectItem value="alta">Alta</SelectItem>
                                            <SelectItem value="critica">Crítica</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>
                        </div>
                        <Separator className="my-6" />
                        <div className="flex justify-between">
                            <Button variant="outline" onClick={() => navigate("/app/dashboard")}>Cancelar</Button>
                            <Button className="bg-[#3b4fd1] hover:bg-[#2c3eb8]" onClick={handleSubmit}>
                                <span className="mr-2">Enviar chamado</span>
                                <Send />
                            </Button>
                        </div>
                    </div>

                </div>

                {/* Informações Adicionais */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg border p-6 mb-6">
                        <h2 className="text-lg font-semibold mb-4">Informações Adicionais</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Nome do Solicitante</label>
                                <Input value={user?.name} readOnly />
                            </div>

                            {/* <div>
                                <label className="block text-sm font-medium mb-1">Número do Chamado</label>
                                <Input
                                    value={`CH-${Math.floor(Math.random() * 90000 + 10000)}`}
                                    readOnly
                                />
                            </div> */}

                            <div>
                                <label className="block text-sm font-medium mb-1">Data da solicitação</label>
                                <div className="relative">
                                    <Input
                                        value={`${new Date().toLocaleDateString('pt-BR')} às ${new Date().getHours()}:${new Date().getMinutes()}`}
                                        readOnly
                                    />
                                    <Calendar className="absolute right-3 top-2.5 h-4 w-4 text-gray-500" />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Status Inicial</label>
                                <div className="flex items-center border rounded-md px-3 py-2">
                                    <Badge className="bg-green-600">Aberto</Badge>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-[#f8f9ff] rounded-lg border p-6">
                        <div className="flex items-start gap-2 mb-3">
                            <Clock className="h-5 w-5 text-[#3b4fd1] mt-0.5" />
                            <div className="text-sm font-medium">Tempo de Resposta</div>
                        </div>

                        <div className="space-y-1 text-sm pl-7">
                            <div className="flex justify-between">
                                <span className="text-[#3b4fd1]">Prioridade Crítica:</span>
                                <span>2 horas</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#3b4fd1]">Prioridade Alta:</span>
                                <span>4 horas</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#3b4fd1]">Prioridade Média:</span>
                                <span>8 horas</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-[#3b4fd1]">Prioridade Baixa:</span>
                                <span>24 horas</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Informações Importantes */}
            <div className="bg-white rounded-lg border p-6 mt-6 mb-12">
                <div className="flex items-start gap-2 mb-3">
                    <Info className="h-5 w-5 text-amber-500 mt-0.5" />
                    <div className="font-medium">Informações Importantes</div>
                </div>

                <ul className="list-disc pl-7 text-sm space-y-1 text-gray-600">
                    <li>Forneça informações detalhadas sobre o problema</li>
                    <li>Anexe capturas de tela se necessário</li>
                    <li>Chamados com prioridade Alta ou Crítica devem ser justificados</li>
                    <li>O tempo de resposta varia de acordo com a prioridade do chamado</li>
                </ul>
            </div>
        </div>
    )
}
