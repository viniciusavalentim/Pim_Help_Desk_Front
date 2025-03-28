import { createBrowserRouter, Link } from "react-router-dom";
import { LayoutAuth } from "./pages/auth";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";
import Page from "./pages/app";
import { TicketsDashboard } from "./pages/app/requester/dashboard";
import { ViewTicket } from "./pages/app/requester/dashboard/viewTicket";

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
                    }
                ]
            },
        ]
    }
]);