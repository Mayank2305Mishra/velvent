import React from 'react'
import Link from 'next/link';
import { account } from '@/lib/appwrite';
const page = async() => {
  return (
    <div className=''>
      <h1>You have been successfully logged in as  , with email id </h1>
    </div>
  )
}

export default page