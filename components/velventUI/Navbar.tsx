"use client"

import { useState } from "react"
import Link from "next/link"
import VelventIcon from "./VelventIcon"
import { cn } from "@/lib/utils"

type NavbarProps = {
    items: { label: string; href: string; }[];
}

export function Navbar({ items }: NavbarProps) {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)


    return (
        <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-background/80 backdrop-blur-md shadow-sm py-5">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex items-center justify-between">
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

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center gap-6">
                        {items.map((item, index) => (
                            <Link
                                key={index}
                                href={item.href}
                                className="text-velvent text-lg font-semibold hover:text-velvent/70 transition-colors"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center gap-4">
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="text-foreground p-2"
                        >
                            <div className="space-y-1.5">
                                <span className={cn(
                                    "block h-0.5 w-6 bg-foreground transition-transform",
                                    mobileMenuOpen && "translate-y-2 rotate-45"
                                )}></span>
                                <span className={cn(
                                    "block h-0.5 w-6 bg-foreground transition-opacity",
                                    mobileMenuOpen && "opacity-0"
                                )}></span>
                                <span className={cn(
                                    "block h-0.5 w-6 bg-foreground transition-transform",
                                    mobileMenuOpen && "-translate-y-2 -rotate-45"
                                )}></span>
                            </div>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu */}
            <div className={cn(
                "md:hidden absolute w-full bg-background/95   backdrop-blur-5xl  shadow-sm transition-all duration-300 overflow-hidden",
                mobileMenuOpen ? "max-h-60 shadow-md" : "max-h-0"
            )}>
                <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
                    {items.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-velvent text-lg font-semibold hover:text-velvent/70 transition-colors py-2"
                        >
                            {item.label}
                        </Link>
                    ))}
                </div>
            </div>
        </nav>
    )
}