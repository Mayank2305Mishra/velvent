"use client"
import { motion } from 'framer-motion'
import React from 'react'

const AuthImg = () => {
    return (
        <div className="relative md:w-1/2 h-64 md:h-screen">
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                    backgroundImage: "url('https://images.unsplash.com/flagged/photo-1572392640988-ba48d1a74457?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
                }}
            >
                <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]"></div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="absolute inset-0 flex items-center justify-center z-10 p-6"
            >
                <div className="text-white max-w-md">
                    <h1 className="text-4xl md:text-6xl font-medium tracking-tight">
                        VELVENT
                    </h1>
                    <p className="mt-4 font-sans font-light text-sm md:text-base tracking-wide leading-relaxed">
                        Where extraordinary art finds its admirers. Discover curated collections from the world's most renowned artists and emerging talents.
                    </p>
                </div>
            </motion.div>
        </div>
    )
}

export default AuthImg