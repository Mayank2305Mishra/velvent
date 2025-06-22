'use client'

import React from 'react'
import { Search, Bell, MessageCircle, Settings, BellDotIcon, SearchCheckIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import VelventIcon from '../VelventIcon'
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from '@radix-ui/react-avatar'
import { useAuthStore } from '@/app/store'
import Image from 'next/image'

const Navbar: React.FC = () => {
  const {user} = useAuthStore()
  return (
    <nav className="fixed top-4 left-4 right-4 z-50 backdrop-blur-2xl bg-black/10 border border-black/30 rounded-3xl shadow-2xl">
      <div className="px-8 py-5">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-3">
            <VelventIcon height={90} width={90} />
          </div>
          {/* Action Buttons */}
          <div className="flex items-center space-x-2">
            <Link href="/settings">
              <Search className="w-6 h-6 hover:text-black" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar