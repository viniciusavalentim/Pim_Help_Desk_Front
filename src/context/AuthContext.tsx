/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { isAxiosError } from "axios";
import { User } from "@/utils/types";
import { queryClient } from "@/lib/queryClient";
import { Login } from "@/api/auth/login";
import { Register } from "@/api/auth/register";
import { Logout } from "@/api/auth/logout";


interface AuthContextData {
    user: User | null;
    setUser: React.Dispatch<React.SetStateAction<User | null>>;
    login: (phone: string, password: string, navigate: any) => Promise<void>;
    register: (phone: string, password: string, confirmPassword: string, navigate: any) => Promise<void>;
    logout: (navigate: any) => void;
    isAuthenticated: boolean;
}

// eslint-disable-next-line react-refresh/only-export-components
export const AuthContext = createContext<AuthContextData | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(() => {
        const storedUser = localStorage.getItem("@pim:user");
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const { mutateAsync: loginFn } = useMutation({
        mutationFn: Login,
        onSuccess: (data) => {
            toast.success("Login feito com sucesso");
            localStorage.setItem("@pim:user", JSON.stringify(data.user));
            localStorage.setItem('accessToken', data.token);
            setUser(data.user);
            setIsAuthenticated(true);
        },
        onError: (error) => {
            console.log(error);
            if (isAxiosError(error) && error.response?.data.error) {
                toast.error(error.response.data.error)
            } else {
                toast.error("Ocorreu um erro ao realizar o login")
            }
        }
    });


    const { mutateAsync: registerFn } = useMutation({
        mutationFn: Register,
        onSuccess: (data) => {
            toast.success("Registro feito com sucesso");
            localStorage.setItem("@pim:user", JSON.stringify(data.user));
            localStorage.setItem('accessToken', data.token);
            setUser(data.user);
        },
        onError: (error) => {
            console.log(error);
            if (isAxiosError(error) && error.response?.data.error) {
                toast.error(error.response.data.error)
            } else {
                toast.error("Ocorreu um erro ao realizar o login")
            }
        }
    });



    const { mutateAsync: logoutFn } = useMutation({
        mutationFn: Logout,
        onSuccess: () => {
            localStorage.removeItem("accessToken");
            setUser(null);
            queryClient.clear();
            setIsAuthenticated(false);
        },
        onError: (error) => {
            console.error("Error ao realizar o logout:", error);
            toast.error("Ocorreu um erro ao realizar o logout")
        }
    })

    async function makeLogin(phone: string, password: string, navigate: any) {
        try {
            await loginFn({ phone, password });
            navigate('/app', { replace: true });
        } catch (err) {
            console.error("Error:", err);
        }
    }

    async function makeRegister(phone: string, password: string, confirmPassword: string, navigate: any) {
        try {
            await registerFn({ phone, password, confirmPassword });
            navigate('/registro/nome', { replace: true });
        } catch (err) {
            console.error("Error:", err);
        }
    }

    async function makeLogout(navigate: any) {
        try {
            await logoutFn();
            navigate('/login');
        } catch (err) {
            console.error("Error ao realizar o logout:", err);
        }
    }

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                login: makeLogin,
                register: makeRegister,
                logout: makeLogout,
                isAuthenticated: isAuthenticated,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = (): AuthContextData => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth deve ser usado dentro de um AuthProvider");
    }
    return context;
};
