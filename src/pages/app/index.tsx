import { AppSidebar } from "@/components/app-sidebar"
import { Separator } from "@/components/ui/separator"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { Outlet } from "react-router-dom"

export default function Page() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12 border-b">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1 text-zinc-800 cursor-pointer" />
                        <Separator orientation="vertical" className="mr-2 h-4" />
                        <h1 className="text-lg text-zinc-800 font-bold">Little Bird | Solicitante</h1>
                    </div>
                </header>
                <div>
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
