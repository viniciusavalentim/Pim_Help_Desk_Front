import { createBrowserRouter, Link } from "react-router-dom";
import { LayoutAuth } from "./pages/auth";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import Page from "./pages/app";
import { TicketsDashboard } from "./pages/app/requester/dashboard";
import { ViewTicket } from "./pages/app/requester/dashboard/viewTicket";
import { NewTicket } from "./pages/app/requester/ticket/novo-ticket";
import ChamadoSucesso from "./pages/app/requester/ticket/success-ticket";

export const route = createBrowserRouter([
    {
        path: "/",
        element: <LayoutAuth />,
        children: [
            {
                path: "/",
                element: <Login />
            },
            {
                path: "/login",
                element: <Login />
            },
            {
                path: "/register",
                element: <Register />
            },
            {
                path: "/app",
                element: <Page />,
                children: [
                    {
                        path: "",
                        element: <Link to={"/app/dashboard"} />
                    },
                    {
                        path: "",
                        element: <TicketsDashboard />
                    },
                    {
                        path: "dashboard",
                        element: <TicketsDashboard />
                    },
                    {
                        path: "dashboard/ticket/:id",
                        element: <ViewTicket />
                    },
                    {
                        path: "dashboard/novo-chamado",
                        element: <NewTicket />
                    },
                    {
                        path: "dashboard/chamado/sucesso",
                        element: <ChamadoSucesso />
                    },
                    {
                        path: "perfil/",
                        element: <NewTicket />
                    },
                    {
                        path: "historico/",
                        element: <NewTicket />
                    },

                ]
            },
        ]
    }
]);