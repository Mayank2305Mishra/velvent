"use client"
import React from 'react'
import {useAuthStore} from '../store';
import Link from 'next/link';
const page = () => {
  const {user} = useAuthStore()
  return (
    <div className='text-xl h-screen flex flex-col text-center items-center justify-center'>
      <h1>{user?.name}</h1>
      <img src={user?.avatar} alt="img" />
      <Link href='/profile'>Profile page</Link>
    </div>
  )
}

export default page