import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'
import React from 'react'

const page = () => {
    return (
        <div className='pt-28 px-4'>
            <div className='max-w-3xl mx-auto'>
                <h1 className='text-4xl font-bold text-center mb-4'>Obviously, let interrogation begin!</h1>
                <h2 className='text-lg font-semibold text-center mb-4'>( Frequently Asked Questions )</h2>
                <div className='mt-12'>
                        <ul className='flex flex-col gap-4'>
                            <li>
                                <div>
                                    <h1 className='text-xl font-bold'>What is Velvent?</h1> 
                                    <p className='text-velvent/80 text-lg font-semibold'>Velvent is where artists and collectors explore a world of creativity. Showcase, sell, or auction your art—it’s obviously the place to be!</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h1 className='text-xl font-bold'>How can I participate in competitions?</h1> 
                                    <p className='text-velvent/80 text-lg font-semibold'>Easy! Register, submit your masterpiece, and let your talent shine. Winning means getting featured, auctioned, and obviously, celebrated!</p>
                                </div>
                            </li>

                            <li>
                                <div>
                                    <h1 className='text-xl font-bold'>Can I sell my artwork directly?</h1> 
                                    <p className='text-velvent/80 text-lg font-semibold'>Obviously! List, auction, or let us handle the process while you explore new opportunities.</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h1 className='text-xl font-bold'>Who can buy from Velvent?</h1> 
                                    <p className='text-velvent/80 text-lg font-semibold'>Art collectors, enthusiasts, businesses—basically, anyone who knows the value of great art. If you love creativity, this is your place to explore.</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h1 className='text-xl font-bold'>How does shipping work?</h1> 
                                    <p className='text-velvent/80 text-lg font-semibold'>We ensure secure and reliable delivery so your art arrives safely—obviously, in perfect condition.</p>
                                </div>
                            </li>
                            <li>
                                <div>
                                    <h1 className='text-xl font-bold'>I’m new here. Where do I start?</h1> 
                                    <p className='text-velvent/80 text-lg font-semibold'>Explore our platform, sign up, and let Velvent open doors to your artistic journey!</p>
                                </div>
                            </li>
                        </ul>
                        <br />
                        <div>
                            <h1 className='text-gray-800 text-xl font-bold'>Still curious?</h1> 
                            <p className='text-gray-800 text-lg font-semibold'>Obviously, we’d love to hear from you! <Link href='/contact' className='text-velvent underline hover:text-velvent/60 transition-all'>Contact Us</Link> </p>
                        </div>
                        <br />
                        <br />
                </div>
            </div>
        </div>
    )
}

export default page

export async function generateMetadata(
    parent: ResolvingMetadata
): Promise<Metadata> {
    return {
        title: "FAQ's | velvent",
    }
}