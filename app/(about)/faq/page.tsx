"use client"
import { Collapsible } from "@/components/ui/collapsible"
import Link from 'next/link'
import React, { useState } from 'react'
import { CollapsibleContent, CollapsibleTrigger } from "@radix-ui/react-collapsible"
import { ChevronDown, ChevronUp } from "lucide-react"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"



const page = () => {
    const faq = [
        {
            id: 1,
            question: "What is Velvent?",
            answer: "Velvent is where artists and collectors explore a world of creativity. Showcase, sell, or auction your art—it’s obviously the place to be!"
        },
        {
            id: 2,
            question: "How can I participate in competitions?",
            answer: "Easy! Register, submit your masterpiece, and let your talent shine. Winning means getting featured, auctioned, and obviously, celebrated!"
        },
        {
            id: 3,
            question: "Can I sell my artwork directly?",
            answer: "Obviously! List, auction, or let us handle the process while you explore new opportunities."
        },
        {
            id: 4,
            question: "Who can buy from Velvent?",
            answer: "Art collectors, enthusiasts, businesses—basically, anyone who knows the value of great art. If you love creativity, this is your place to explore."
        },
        {
            id: 5,
            question: "How does shipping work?",
            answer: "We ensure secure and reliable delivery so your art arrives safely—obviously, in perfect condition."
        },
        {
            id: 6,
            question: "I’m new here. Where do I start?",
            answer: "Explore our platform, sign up, and let Velvent open doors to your artistic journey!"
        }

    ]
    const [open, setOpen] = useState(false)
    return (
        <div className='pt-28 px-4'>
            <div className='max-w-3xl mx-auto'>
                <h1 className='text-4xl font-bold text-center mb-4'>Obviously, let interrogation begin!</h1>
                <h2 className='text-lg font-semibold text-center mb-4'>( Frequently Asked Questions )</h2>
                <div className='mt-12'>
                    <Accordion type="single" collapsible className="w-full">
                        {faq.map((item, index) => (
                            <AccordionItem value={`item-${index + 1}`} key={index}>
                                <AccordionTrigger className='text-lg font-semibold'>{item.question}</AccordionTrigger>
                                <AccordionContent className='text-lg text-gray-800 font-medium'>
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
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