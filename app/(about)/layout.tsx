import React, { ReactNode } from 'react'
import type { Metadata } from "next";
import { Navbar } from '@/components/velventUI/Navbar';

export const metadata: Metadata = {
    title: "Velvent",
    description: "Bazaar of Unforeseen Art",
    icons: {
      icon: "/logo.png",
    },
  };

const AboutLayout = ({ children }: { children: ReactNode }) => {
      const items = [
        { label: "About Us", href: "/about" },
        { label: "Contact Us", href: "/contact" },
        { label: "FAQ ", href: "/faq" },
        { label: "New User", href: "/new" },
      ];
    return (
        <main suppressHydrationWarning>
            <Navbar items={items}/>
            {children}
        </main>
    )
}

export default AboutLayout
