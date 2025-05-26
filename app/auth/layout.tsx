import React, { ReactNode } from "react"
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
    title: "Auth | Velvent",
    description: "Bazaar of Unforeseen Art",
    icons: {
      icon: "/logo.png",
    },
  };

const AuthLayout = ({ children }: { children: ReactNode }) => {
    return (
        <div className="flex flex-col md:flex-row h-screen">
            <Image
                src="https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                height={1000}
                width={1000}
                alt="art"
                className=" hidden h-full object-cover md:block max-w-[50%]"
            />
            <section className="flex flex-col h-full w-full md:w-[50%] items-center justify-center text-center flex-1 px-[5%]">
                {children}
            </section>
        </div>
    )
}

export default AuthLayout