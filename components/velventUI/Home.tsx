
import { getCurrentAccount } from '@/lib/actions/user.action'
import React from 'react'

const Home = async() => {
    const user = await getCurrentAccount()
    console.log(user);
    
  return (
    <div>
      HEllo DUniya
    </div>
  )
}

export default Home