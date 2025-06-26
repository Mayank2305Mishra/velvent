"use client"
import { INITIAL_USER, useAuthStore } from "@/app/store"
import BottomNavigation from "@/components/velventUI/HomeLayout/BottomBar"
import Sidebar from "@/components/velventUI/HomeLayout/LeftSideBar"
import Navbar from "@/components/velventUI/HomeLayout/TopNavBar"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"


export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const { checkAuthUser, googleUserData } = useAuthStore()
    useEffect(() => {
        const data = googleUserData()
        const userstate = checkAuthUser()
    })
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

    const {user} = useAuthStore()
    return (
        <html lang="en">
            <body>
                {/* Navbar */}
                <Navbar />

                {/* Sidebar for Large Devices Only */}
                <Sidebar user={user} />
                <main className={cn(
                    "butter-smooth pt-32 pb-24 lg:pb-12 px-3 lg:px-4",
                    sidebarCollapsed ? "lg:ml-28" : "lg:ml-80"
                )}>
                    <div className="max-w-6xl mx-auto">
                    {children}
                    </div>
                </main>
                    <BottomNavigation user={user} />
            </body>
        </html>
    )
}