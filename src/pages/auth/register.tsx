import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowRightCircle, Ban, Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

const registerSchema = z.object({
    name: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6, { message: "A confirmação de senha deve ter pelo menos 6 caracteres." }),
})
    .refine((data) => data.password === data.confirmPassword, {
        message: "As senhas não coincidem.",
        path: ["confirmPassword"],
    });

type registerData = z.infer<typeof registerSchema>;

export function Register() {
    const navigate = useNavigate();
    const [password, setPassword] = useState<boolean>(false);
    const [confirmPassword, setConfirmPassword] = useState<boolean>(false);

    const { register, handleSubmit, formState: errors } = useForm<registerData>({
        resolver: zodResolver(registerSchema)
    });

    const handleGoLogin = () => {
        navigate('/login');
    }

    async function handleSubmitForm(data: registerData) {
        console.log(data);
    }
    return (
        <>
            <div className="hidden w-[60%] items-center justify-center p-8 lg:flex">
                <div className="max-w-md">
                    <img
                        src="/register.svg"
                        width={400}
                        height={400}
                        alt="Ilustração de pessoa com envelope"
                        className="mx-auto"
                    />
                </div>
            </div>

            <div className="flex w-full flex-col justify-center p-8 lg:w-[40%] rounded-lg shadow-lg">
                <div className="flex flex-col space-y-12 w-full max-w-md text-center sm:p-6 py-12 mx-auto">
                    <form className="space-y-4" onSubmit={handleSubmit(handleSubmitForm)}>
                        <div>
                            <h1 className="text-zinc-900 text-3xl font-bold">Seja Bem Vindo!</h1>
                            <p className="text-zinc-400">Insira seus dados para realizar o Registro</p>
                        </div>
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Nome</Label>
                                <Input placeholder="Digite seu nome" {...register("name")} />
                                {errors.errors.name && <p className="text-red-600 text-sm text-start flex gap-2 items-center"><Ban className="w-3 h-3" /> Nome inválido</p>}
                            </div>
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
                            <div className="space-y-2">
                                <Label>Confirme sua senha</Label>
                                <div className="relative">
                                    <Input placeholder="Digite sua senha" type={confirmPassword ? "text" : "password"}   {...register("confirmPassword")} />
                                    <div className="absolute top-2 right-2" onClick={() => setConfirmPassword(!confirmPassword)}>
                                        {confirmPassword ? <Eye className="w-5 h-5 cursor-pointer" /> : <EyeOff className="w-5 h-5 cursor-pointer" />}
                                    </div>
                                </div>
                                {errors.errors.confirmPassword && <p className="text-red-600 text-sm text-start flex gap-2 items-center"><Ban className="w-3 h-3" /> {errors.errors.confirmPassword.message}</p>}
                            </div>
                        </div>
                        <div className="w-full space-y-4">
                            <Button className="w-full flex justify-between items-center bg-primary cursor-pointer">Entrar <ArrowRightCircle /></Button>
                            <div>
                                <p className="text-zinc-400">Já tem cadastrado? <span className="text-primary cursor-pointer" onClick={handleGoLogin}>Login</span></p>
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        </>
    )
}
