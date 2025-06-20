"use client"
import React from 'react'
import { useAuthStore } from '../store'
import Image from 'next/image'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"

const page = () => {
  const {user} = useAuthStore() 
  return (
    <div className='flex flex-row justify-center w-full'>
      {/* Background image */}
      <div className="relative w-full h-[28vh] lg:h-[35vh]">
        <Image
          src={user?.bannerImg} // ✅ Make sure this file exists in the /public folder
          alt="Banner"
          fill
          className="object-cover object-center"
          priority
        />
      </div>
    </div>
  )

}

export default page