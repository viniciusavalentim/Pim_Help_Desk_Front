import {
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <div className="flex items-center justify-center rounded-lg bg-transparent text-sidebar-primary-foreground mt-5 mb-0">
          <img
            src="/logo.png"
            width={90}
            height={60}
            alt="Ilustração de pessoa com envelope"
            className="mx-auto"
          />
        </div>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
