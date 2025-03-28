import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
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
            </div>
        </>
    )
}