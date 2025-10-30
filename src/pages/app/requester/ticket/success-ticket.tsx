import { ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

export default function ChamadoSucesso() {
    const naviagte = useNavigate();
    return (
        <div className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="flex flex-col items-center text-center mt-24">
                {/* Ícone de sucesso */}
                <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-6">
                    <CheckCircle2 className="h-12 w-12 text-green-500" />
                </div>

                {/* Mensagem de sucesso */}
                <h1 className="text-2xl font-bold mb-2">Chamado Enviado com Sucesso!</h1>
                <p className="text-gray-600 mb-8">Seu chamado foi registrado e será atendido em breve.</p>

                {/* Detalhes do chamado */}
                {/* <div className="w-full border border-green-200 rounded-lg p-6 mb-8 bg-green-50/50">
                    <h2 className="font-medium mb-4">Detalhes do Chamado</h2>

                    <div className="grid grid-cols-2 gap-y-4">
                        <div>
                            <p className="text-sm text-gray-500">Número do Chamado</p>
                            <p className="font-medium">CH-78945</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Data de Abertura</p>
                            <p className="font-medium">19/03/2023, 08:36:40</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Categoria</p>
                            <p className="font-medium">Suporte Técnico</p>
                        </div>

                        <div>
                            <p className="text-sm text-gray-500">Prioridade</p>
                            <p className="font-medium">Alta</p>
                        </div>
                    </div>
                </div> */}

                {/* Botão de voltar */}
                <Button className="bg-[#3b4fd1] hover:bg-[#2c3eb8] mb-8 min-w-[150px]" onClick={() => naviagte("/app/dashboard")}>
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Voltar
                </Button>

                {/* Informações adicionais */}
                <div className="text-center space-y-2 text-sm text-gray-600">
                    <p>Você receberá atualizações sobre o status do seu chamado por e-mail.</p>
                    <p>Para acompanhar o progresso, acesse a seção Histórico no menu lateral.</p>
                </div>
            </div>
        </div>
    )
}
