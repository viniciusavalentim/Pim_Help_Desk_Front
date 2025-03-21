import { createBrowserRouter } from "react-router-dom";
import { LayoutAuth } from "./pages/auth";
import { Login } from "./pages/auth/login";
import { Register } from "./pages/auth/register";

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
        ]
    }
]);