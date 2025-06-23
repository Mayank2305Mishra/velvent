"use client"
import React from 'react'
import { useAuthStore } from '../../store'
import Image from 'next/image'
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
import { useRouter } from 'next/navigation'

const page = () => {
  const {user} = useAuthStore() 
  const route = useRouter()
  return (
    <div className="min-h-screen flex flex-col">
      {/* Banner Section */}
      <div className="relative w-full h-[22vh] md:h-[30vh]">
        <Image
          src={user?.bannerImg}
          alt="Banner"
          fill
          className="object-cover object-center rounded-3xl"
          priority
        />

        {/* Profile Image - Bottom Left Overlay */}
        <div className="absolute bottom-[-3.5rem] left-4 sm:left-8">
          <Avatar className="w-24 h-24 sm:w-32 sm:h-32 border-4 border-white bg-velvent shadow-2xl">
            <AvatarImage src={user?.avatar} alt="User" />
            <AvatarFallback>MM</AvatarFallback>
          </Avatar>
        </div>

        {/* Edit Profile Button for Desktop */}
        <div className="hidden sm:block absolute bottom-4 right-8">
          <Button variant="secondary" onClick={() => {route.push("/profile/edit")}} className="bg-velvent/90 hover:bg-velvent/50 text-white border border-white  ">
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Username + Edit Button (for mobile) */}
      <div className="flex justify-between items-center mt-20 sm:mt-18 px-4 sm:px-8">
        <h1 className="text-xl sm:text-2xl font-semibold text-velvent">
          {user?.name}
        </h1>

        {/* Edit Button visible only on mobile */}
        <div className="sm:hidden">
          <Button variant="default" size="sm" onClick={() => {route.push("/profile/edit")}} className="bg-velvent/90 text-white border border-white  ">
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  )

}

export default page