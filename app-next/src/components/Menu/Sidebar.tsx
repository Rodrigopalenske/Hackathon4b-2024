"use client";
import { CalendarDays, LayoutDashboard, LibraryBig, Map, User } from "lucide-react";
import {
    Command,
    CommandGroup,
    CommandItem,
    CommandList,
  } from "@/components/ui/command"
import Link from "next/link";
import { NavBarLink } from "./style";
import { link } from "fs";

export const Sidebar = () => {
    
    const menuList = [
        {
            group: 'Geral', 
            items: [
                {
                    link: '/dashboard',
                    icon: <LayoutDashboard />,
                    text: 'Dashboard'
                },
                {
                    link: '/reservas',
                    icon: <CalendarDays /> ,
                    text: 'Reservas'
                }
            ],
        },
        {
            group: 'Adminitração', 
            items: [
                {
                    link: '/ambiente',
                    icon: <Map />,
                    text: 'Ambientes'
                },
                {
                    link: '/relatorio',
                    icon: <LibraryBig />,
                    text: 'Relatórios de uso'
                },
                {
                  link: '/usuario',
                  icon: <User />,
                  text: 'Usuario'
                }
            ]
               
        }
    ]

  return (
    <div className="fixed flex flex-col gap-4 w-[300px] min-2-[300px] p-4 min-h-screen fundoSideBar">
      <div className="grow">
        <Command style={{ overflow: 'visible'}}>
          <CommandList style={{ overflow: 'visible'}}>
            {menuList.map((menu: any, key: number) => 
                <CommandGroup key={key} heading={menu.group}>
                    {menu.items.map((option: any, optionKey: number) => 
                        <NavBarLink className="linkSideBar" href={option.link} key={optionKey}>
                          <CommandItem key={optionKey} className="itemSideBar flex gap-2 cursor-pointer p-2 rounded-md">
                              {option.icon}
                              {option.text}
                          </CommandItem>
                        </NavBarLink>
                    )}
                </CommandGroup>
                
            )}
          </CommandList>
        </Command>
      </div>
    </div>
  );
};
