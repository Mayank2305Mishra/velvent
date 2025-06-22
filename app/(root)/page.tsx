"use client"
import React from 'react'
import {useAuthStore} from '../store';
import Link from 'next/link';
const page = () => {
  const {user} = useAuthStore()
  return (
    <div className=''>
      <h1>You have been successfully logged in as {user?.name} , with email id {user?.email}</h1>
    </div>
  )
}

export default page