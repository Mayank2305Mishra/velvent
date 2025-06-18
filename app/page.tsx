import { getLoggedInUser } from '@/lib/actions/user.action'
import React from 'react'

const page = async () => {
  const user = await getLoggedInUser()
  console.log(user);
  return (
    <div>
    </div>
  )
}

export default page