import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightCircle, Ban, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

type LoginSchema = z.infer<typeof loginSchema>;

export function Login() {
    const navigate = useNavigate();
    const [password, setPassword] = useState<boolean>(false);

    const { register, handleSubmit, formState: errors } = useForm<LoginSchema>({
        resolver: zodResolver(loginSchema)
    });

    const handleGoRegister = () => {
        navigate('/register');
    }
    return (
        <>
            <div className="hidden w-[60%] items-center justify-center p-8 lg:flex">
                <div className="max-w-md">
                    <img
                        src="/image.png"
                        width={400}
                        height={400}
                        alt="Ilustração de pessoa com envelope"
                        className="mx-auto"
                    />
                </div>
            </div>

            <div className="flex w-full flex-col justify-center p-8 lg:w-[40%] rounded-lg shadow-lg">
                <div className="flex flex-col space-y-12 w-full max-w-md text-center sm:p-6 py-12 mx-auto">
                    <form className="space-y-4" onSubmit={handleSubmit((data) => console.log(data))}>
                        <div>
                            <h1 className="text-zinc-900 text-3xl font-bold">Olá, Novamente</h1>
                            <p className="text-zinc-400">Insira seus dados para realizar o login</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input placeholder="Digite seu email" {...register("email")} />
                                {errors.errors.email && <p className="text-red-600 text-sm text-start flex gap-2 items-center"><Ban className="w-3 h-3" /> Email inválido</p>}
                            </div>
                            <div className="space-y-2">
                                <Label>Senha</Label>
                                <div className="relative">
                                    <Input placeholder="Digite sua senha" type={password ? "text" : "password"}   {...register("password")} />
                                    <div className="absolute top-2 right-2" onClick={() => setPassword(!password)}>
                                        {password ? <Eye className="w-5 h-5 cursor-pointer" /> : <EyeOff className="w-5 h-5 cursor-pointer" />}
                                    </div>
                                </div>
                                {errors.errors.password && <p className="text-red-600 text-sm text-start flex gap-2 items-center"><Ban className="w-3 h-3" /> Senha inválida. No mínimo 6 caracteres</p>}
                            </div>
                        </div>
                        <div className="w-full space-y-4">
                            <Button className="w-full flex justify-between items-center bg-primary cursor-pointer">Entrar <ArrowRightCircle /></Button>
                            <div>
                                <p className="text-zinc-400">Ainda não está cadastrado? <span className="text-primary cursor-pointer" onClick={handleGoRegister}>Registre-se</span></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
