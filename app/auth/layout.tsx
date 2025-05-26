import React, { ReactNode } from "react"
import type { Metadata } from "next";
import { AnimatePresence, motion } from "framer-motion";
import AuthImg from "@/components/velventUI/AuthImg";

export const metadata: Metadata = {
    title: "Auth | Velvent",
    description: "Bazaar of Unforeseen Art",
    icons: {
        icon: "/logo.png",
    },
};

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="min-h-screen flex flex-col md:flex-row overflow-hidden">
            {/* Art Section */}
            <AuthImg />
            <section className="flex flex-col h-screen w-full md:w-[50%] items-center justify-center text-center flex-1 px-[5%]">
                {children}
            </section>
        </div>
    )
}

export default AuthLayout