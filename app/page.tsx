"use client"
import Home from '@/components/velventUI/Home'
import React from 'react'
import { useAuthStore } from './store'

const page = () => {
  const { user } = useAuthStore()

  return (
    <div>
      {user?.name}
    </div>
  )
}

export default page