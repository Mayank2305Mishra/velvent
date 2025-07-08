'use client'

import React from 'react'
import { cn } from '@/lib/utils'
import { navItems } from '@/types/Navlinks'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import Image from 'next/image'

const BottomNavigation = ({user}: {user : User}) => {
  const pathname = usePathname()
  return (
    <div className="fixed bottom-6 left-4 right-4 z-50 lg:hidden">
      <div className="backdrop-blur-2xl bg-black/10 border border-black/30 rounded-3xl shadow-2xl p-3">
        <div className="flex items-center justify-around">
          {navItems.map((item, index) =>{ 
            const active = pathname === item.route || pathname.startsWith(`${item.route}/`);
            return(
            <Link
              href={item.route}
              key={index}
              className={cn(
                "flex flex-col items-center p-3 rounded-2xl ultra-smooth border-0 h-auto",
                active
                  ? "bg-gradient-to-r from-velvent/50 to-velvent/60 border border-black/30"
                  : "hover:bg-white/10"
              )}
            >
              <Tooltip>
              <TooltipTrigger asChild>
                <item.icon className={cn(
                "w-5 h-5 ultra-smooth",
                active ? "text-black" : "text-velvent group-hover:text-black"
              )} />
              </TooltipTrigger>
              <TooltipContent>
                <p>{item.label}</p>
              </TooltipContent>
              </Tooltip>
            </Link>
          )})}
          <Link href="/profile" className='bg-black rounded-full'>
            <Image
              src={user?.avatar || "https://api.dicebear.com/6.x/micah/png?seed=MM&backgroundColor=b6e3f4,c0aede,d1d4f9"}
              alt="Profile"
              width={30}
              height={30}
              className="object-cover object-center rounded-full"
            />
          </Link>
        </div>
      </div>
    </div>
  )
}

export default BottomNavigation