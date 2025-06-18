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
        <>
            {children}
        </>
    )
}

export default AuthLayout