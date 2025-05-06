import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom"

export function ViewTicket() {
    const navigate = useNavigate();

    const handleBackPage = () => {
        navigate("/app/dashboard");
    }
    return (
        <>
            <div className="p-4">
                <div>
                    <Button onClick={handleBackPage} className="bg-transparent hover:bg-transparent text-zinc-800 cursor-pointer">
                        <ArrowLeft />
                        Voltar
                    </Button>
                </div>
                <div className="container mx-auto py-6 ">
                    <div className="text-sm text-gray-600 mb-2">Central de Chamados &gt; Problema com a impressora</div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <h2 className="text-lg font-semibold">Detalhes do seu chamado</h2>
                                        <p className="text-sm text-gray-500">Detalhes do chamado: #1214</p>
                                    </div>
                                    <Badge className="bg-green-500 hover:bg-green-600">Concluída</Badge>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center">
                                        <h3 className="text-base font-medium">Problema com a impressora</h3>
                                        <Badge className="ml-2 bg-red-400 hover:bg-red-500">Alta</Badge>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Categoria:</p>
                                        <p>Dispositivos (Impressoras, Hardwares, etc...)</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Descrição:</p>
                                        <p>Impressora não imprime papel</p>
                                    </div>

                                    <div className="text-right text-sm text-gray-500">
                                        <p>Criado em: Ontem às 14:30</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Dados do Atendente */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg border p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <h2 className="text-lg font-semibold">Dados do Atendente</h2>
                                    <Badge className="bg-amber-400 text-amber-950 hover:bg-amber-500">Ausente</Badge>
                                </div>

                                <div className="flex items-center mb-4">
                                    <Avatar className="h-10 w-10 bg-[#f8d7f9]">
                                        <AvatarFallback className="bg-[#f8d7f9] text-[#a44fb3]">E</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-3">
                                        <div className="flex justify-between">
                                            <p className="font-medium">Eduardo</p>
                                            <p className="text-gray-500">Ramal</p>
                                        </div>
                                        <div className="flex justify-between">
                                            <p className="text-gray-500"></p>
                                            <p className="font-medium">1313</p>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Departamento</p>
                                        <p>Suporte Técnico</p>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Último Acesso</p>
                                        <div className="flex items-center">
                                            <Clock className="h-4 w-4 mr-1 text-gray-500" />
                                            <p>Há 45 minutos</p>
                                        </div>
                                    </div>

                                    <div>
                                        <p className="text-sm font-medium text-gray-500">Cargo</p>
                                        <p>Técnico Júnior</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Histórico de interações */}
                    <div className="mt-6 space-y-4">
                        {/* Primeira mensagem */}
                        <div className="bg-white rounded-lg border p-4">
                            <div className="flex items-center mb-3">
                                <Avatar className="h-8 w-8 bg-[#f8d7f9]">
                                    <AvatarFallback className="bg-[#f8d7f9] text-[#a44fb3]">E</AvatarFallback>
                                </Avatar>
                                <div className="ml-2 font-medium">Eduardo</div>
                            </div>
                            <p>Tente reiniciar o seu computador.</p>
                        </div>

                        {/* Segunda mensagem */}
                        <div className="bg-white rounded-lg border p-4">
                            <div className="flex items-center mb-3">
                                <Avatar className="h-8 w-8 bg-[#f8d7f9]">
                                    <AvatarFallback className="bg-[#f8d7f9] text-[#a44fb3]">E</AvatarFallback>
                                </Avatar>
                                <div className="ml-2 font-medium">Eduardo</div>
                            </div>
                            <p className="text-gray-700">
                                Lorem ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
                                industry&apos;s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
                                scrambled it to make a type specimen book. It has survived not o
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}