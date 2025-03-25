import { createBrowserRouter } from "react-router-dom";
import { LayoutAuth } from "./pages/auth";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import Page from "./pages/app";
import { TicketsDashboard } from "./pages/app/requester/dashboard";

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
                        element: <TicketsDashboard />
                    },
                    {
                        path: "dashboard",
                        element: <TicketsDashboard />
                    }
                ]
            },
        ]
    }
]);