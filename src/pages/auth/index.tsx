import { Outlet } from "react-router-dom";

export function LayoutAuth() {
    return (
        <main className="min-h-screen flex w-full">    
            <Outlet />
        </main>
    )
}   