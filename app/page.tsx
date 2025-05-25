"use client"
import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

const page = () => {
  const router = useRouter()
  const [login, setLogin] = useState(false)
  if (!login) {
    router.push('/new')
  }
  return (
    <div>
    </div>
  )
}

export default page