import VelventIcon from '@/components/velventUI/VelventIcon'
import Link from 'next/link'
import React, { ReactNode } from 'react'
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Velvent",
    description: "Bazaar of Unforeseen Art",
    icons: {
      icon: "/logo.png",
    },
  };

const AboutLayout = ({ children }: { children: ReactNode }) => {
    return (
        <main suppressHydrationWarning>
            <nav className='flex-between bg-gradient-to-b from-light-600 to-light-200/50 backdrop-blur-3xl fixed z-50 w-full gap-5 p-6  shadow-light-700 shadow-lg border-b-1 border-velvent  sm:px-12'>
                <Link href='/' className='items-center md:flex hidden gap-2'>
                    <VelventIcon
                        width={120}
                        height={120}
                    />
                </Link>
                <Link href='/' className='flex items-center md:hidden gap-2'>
                    <VelventIcon
                        width={80}
                        height={80}
                    />
                </Link>
                <div className="flex gap-2 items-center space-x-4">
                    <Link href='/about' className='nav-link' >About Us</Link>
                    <Link href='/contact' className='nav-link'>Contact Us</Link>
                </div>
            </nav>
            {children}
        </main>
    )
}

export default AboutLayout
