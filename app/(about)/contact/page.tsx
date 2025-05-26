import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import React from 'react'
import { MailIcon } from 'lucide-react'
import { PhoneIcon } from 'lucide-react'
import { InstagramIcon } from 'lucide-react'

const page = () => {
  return (
    <main className="min-h-screen px-6 py-16 pt-28">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">Contact velvent!</h1>
        <p className="text-center font-semibold text-lg mb-10">
          Got a masterpiece to share, a question to ask, or an idea to explore? We’re here for it!
        </p>

        <section className=" bg-light-300/85 backdrop-blur-3xl p-8 rounded-2xl shadow-xl mt-12 text-center space-y-4">
          <h2 className="text-xl font-semibold text-velvent">Ways to Connect</h2>
          <div className="flex flex-col md:px-32 justify-center gap-4 mt-4">
            <Link
              href="mailto:velventart@gmail.com"
              className="bg-velvent text-lg text-white px-6 py-3 rounded-lg font-medium hover:bg-velvent/60 flex flex-row text-center items-center justify-center gap-4 transition"
            >
              <MailIcon className='h-5 w-5'/> Message Us
            </Link>
            <Link
              href="tel:+923001234567"
              className="bg-velvent disabled:opacity-50 text-lg text-white px-6 py-3 rounded-lg font-medium hover:bg-velvent/60 flex flex-row text-center items-center justify-center gap-4 transition"
            >
              <PhoneIcon className='h-5 w-5'/> Call Us
            </Link>
            <Link
              href="https://instagram.com/velventart"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-velvent gap-4 text-lg text-white px-6 py-3 rounded-lg font-medium hover:bg-velvent/60 flex flex-row text-center items-center justify-center transition"
            >
              <InstagramIcon className='h-5 w-5'/> Follow Us
            </Link>
            </div>
        </section>

        <div className="mt-16 text-center text-sm text-[#5c2a75]">
          <p>Email us at <a href="mailto:velventart@gmail.com" className="underline">velventart@gmail.com</a></p>
          <p className="mt-2">velvent &copy; {new Date().getFullYear()}</p>
        </div>
      </div>
    </main>
  )
}

export default page

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    title: "Contact | velvent",
  }
}