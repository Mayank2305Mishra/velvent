"use client"
import React, { useState } from 'react'
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { LockKeyhole } from "lucide-react";
import { FadeInStagger } from '@/components/velventUI/Animation';
import VelventIcon from '@/components/velventUI/VelventIcon';

const page = () => {
  return (
    <div className="flex-1 flex items-center justify-center p-6 md:p-12 bg-background">
      <div className="w-full max-w-md">
        <FadeInStagger>
          <motion.div className="mb-10 flex flex-col gap-4 items-center">
            <VelventIcon height={140} width={140} /> 
            <h2 className="text-2xl font-medium">Login</h2>
            <h1 className="text-xl font-light">Register & Jump into the bazaar!</h1>
          </motion.div>
          
          <br />
        </FadeInStagger>
      </div>
    </div>
  )
}

export default page