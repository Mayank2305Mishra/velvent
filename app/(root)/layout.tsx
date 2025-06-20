"use client"
import { useAuthStore } from "@/app/store"
import { useEffect } from "react"
export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const {checkAuthUser} = useAuthStore()
    useEffect(() => {
        const userstate = checkAuthUser()
    })
    return (
        <html lang="en">
            <body>{children}</body>
        </html>
    )
}