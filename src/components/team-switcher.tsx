import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

export function TeamSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size="lg"
          className="hover:bg-trasparent active:bg-gray-900"
        >
          <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-transparent text-sidebar-primary-foreground">
            <img src="/logo.png" alt="" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate text-lg font-semibold text-white">
              Little Bird
            </span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
