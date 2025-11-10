import * as React from "react"
import {
  BookAIcon,
  BookDashedIcon,
  BookIcon,
  Clock10,
  HouseIcon,
  User2,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"

const data = {
  user:
    { name: "Bleiner", email: "bleiner@gmail.com", avatar: "/bleiner.png" },
  navMain: [
    { title: "Central de Chamados", url: "/app/dashboard", icon: HouseIcon, roles: ['app'], type: 3 },
    // { title: "Perfil", url: "/app/perfil", icon: User2, roles: ['app'], type: 3 },
    // { title: "Histórico", url: "/app/historico", icon: Clock10, roles: ['app'], type: 3 },
    { title: "Central de Atendimentos", url: "/app/atendente", icon: HouseIcon, roles: ['app'], type: 2 },
    { title: "Relatórios", url: "/app/relatorios", icon: BookIcon, roles: ['app'], type: 2 },

    /* {
      title: "Laudadores", url: "#", icon: UsersRound, items:
        [
          { title: "Vinicius", url: "#", status: 'A' },
          { title: "Bleiner Mathias", url: "#", status: 'A' },
          { title: "Paulo Pedroso", url: "#", status: 'I' },
          { title: "Paulo Pedroso", url: "#", status: 'I' },
          { title: "Paulo Pedroso", url: "#", status: 'I' },
          { title: "Ver mais", url: "#", status: 'I', icon: MoreHorizontal }
        ]
    }, */
  ]
};



export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props} className="bg-primary">
      <SidebarHeader className="bg-primary">
        <TeamSwitcher />
      </SidebarHeader>
      <SidebarContent className="bg-primary">
        <NavMain items={data.navMain} />
      </SidebarContent >
      {/* <SidebarFooter className="bg-primary">
        <NavUser user={data.user} />
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  )
}
