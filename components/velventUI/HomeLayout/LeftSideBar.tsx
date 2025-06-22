'use client'

import React from 'react'
import { Home, Settings, Users } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { useAuthStore } from '@/app/store'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { navItems } from '@/types/Navlinks'


interface SidebarProps {
  isCollapsed: boolean
  onToggle: () => void
}

const Sidebar = ({ user }: {user : User}) => {
  const pathname = usePathname()
  return (
    <div className={cn(
      "fixed left-4 top-30 bottom-4 z-50 hidden lg:block butter-smooth",
      "w-72"
    )}>
      <div className="h-full backdrop-blur-2xl bg-black/10 border border-black/30 rounded-3xl shadow-4xl overflow-hidden">
        {/* Navigation */}
        <div className="p-6 space-y-3">
          {navItems.map((item, index) => {
            const active = pathname === item.route || pathname.startsWith(`${item.route}/`);
            return(
            <Link
              href={item.route}
              key={index}
              className={cn(
                "flex items-center p-4 rounded-2xl cursor-pointer group ultra-smooth",
                "hover:bg-light-400 hover:border-light-900 border border-transparent",
                active && "bg-gradient-to-r from-velvent/50 to-velvent/60  border-black/30",
                "space-x-4"
              )}
            >
              <item.icon className={cn(
                "w-6 h-6 ultra-smooth flex-shrink-0",
                active ? "text-black" : "text-velvent group-hover:text-black"
              )} />
              <span className={cn(
                "font-medium ultra-smooth whitespace-nowrap",
                active ? "text-black" : "text-velvent group-hover:text-black",
                "opacity-100"
              )}>
                {item.label}
              </span>
            </Link>
          )})}
        </div>

        {/* Profile Section */}
        <div className="absolute bottom-6 left-6 right-6">
          <div className={cn(
            "flex items-center p-4 rounded-2xl bg-white/5 border border-white/10",
            "hover:bg-white/10 cursor-pointer ultra-smooth",
             "space-x-4"
          )}>
            <Avatar className='bg-black/70 w-10 h-10'>
              <AvatarImage src={user?.avatar} alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <div className={cn(
              "ultra-smooth overflow-hidden",
              "opacity-100"
            )}>
              <p className="text-velvent font-medium text-sm whitespace-nowrap">{user?.name}</p>
              <p className="text-gray-900 text-xs whitespace-nowrap">{user?.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Sidebar