"use client"

import { ChevronRight, type LucideIcon } from "lucide-react"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar"
import { useNavigate } from "react-router-dom"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: LucideIcon
    isActive?: boolean
    items?: {
      title: string
      url: string
      status: string
      icon?: LucideIcon
    }[]
  }[]
}) {
  const navigate = useNavigate();

  function goToSection(value: string, isItems: boolean) {
    if (isItems) {
      navigate(value);
    }
  }
  return (
    <SidebarGroup>
      <SidebarGroupLabel className="text-zinc-200 font-semibold"></SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <Collapsible
            key={item.title}
            asChild
            defaultOpen={item.isActive}
            className="group/collapsible"
            onClick={() => goToSection(item.url, item.items?.length ? false : true)}
          >
            <SidebarMenuItem className="text-zinc-200">
              <CollapsibleTrigger asChild>
                <SidebarMenuButton tooltip={item.title} className={`${location.pathname.split('/')[2] === item.url.split('/')[2] ? "bg-white active:bg-white hover:bg-white text-zinc-800" : ""}`}>
                  {item.icon && <item.icon />}
                  <span className="text-title font-semibold">{item.title}</span>
                  {item.items?.length && (<ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />)}
                </SidebarMenuButton>
              </CollapsibleTrigger>
              <CollapsibleContent >
                {item.items?.length && (
                  <SidebarMenuSub>
                    {item.items?.map((subItem, index) => (
                      <SidebarMenuSubItem key={subItem.title + subItem.status + index}>
                        <SidebarMenuSubButton asChild>
                          <a href={subItem.url} className="flex items-center gap-2">
                            <span className="text-zinc-300 ">
                              {subItem.icon && <subItem.icon className="w-4 h-4" />}
                            </span>
                            {!subItem.icon && <div className={`w-2 h-2 rounded-full ${subItem.status === 'A' ? 'bg-green-600' : 'bg-orange-600'}`}></div>}
                            <span>{subItem.title}</span>
                          </a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                )}
              </CollapsibleContent>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  )
}
