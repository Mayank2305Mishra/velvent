import { Metadata, ResolvingMetadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const page = () => {

  return (
    <div className="flex h-screen">
      <section className="remove-scrollbar relative flex-1 h-full overflow-y-auto px-[5%] my-auto">
        <div className=' mx-auto flex size-full pt-240 md:pt-200 justify-center items-center flex-col max-w-[496px]'>
          <div className="text-center mb-12 ">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              About <span className="text-valvent">Valvent</span>
            </h1>
          </div>
          <div className="space-y-6">
            {/* About Valvent */}
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4">Who We Are</h2>
              <p className="text-gray-800 text-lg leading-relaxed">
              <strong>Obviously</strong>, You’ve always believed in the power of art—its ability to move, inspire, and create lasting impact. Whether you’re an artist pouring your soul into every art or a collector searching for that one piece that speaks to you, you shouldn’t have to settle for anything less than extraordinary.
              <br />
              <strong>At Velvent</strong>,We are more than just an art marketplace—we’re a thriving ecosystem where creativity meets commerce. A digital bazaar where artists gain visibility, collectors discover their next masterpiece, and both walk away with something invaluable.
              </p>
            </div>
            {/* Vision */}
            <div>
              <h2 className="text-2xl font-semibold text-black mb-4">What We Offer</h2>
              <ul className="text-gray-800 text-lg leading-relaxed list-disc list-inside">
              <li><strong>Art Without Boundaries</strong> – From paintings to digital creations, our platform showcases a diverse range of works waiting to be explored.</li>
              <li><strong>Opportunities for Every Artist</strong> – Whether you’re selling, auctioning, or commissioning, Velvent provides multiple revenue streams tailored to your artistic journey.</li>
              <li><strong>Collectors, Curated for You</strong> – No guesswork, no uncertainty—just an effortless way to discover and invest in authentic, high-value art.</li>
              <li><strong>A New Standard in Art Commerce</strong> – Exclusive events, social media sales, museum auctions, and bespoke art services—Velvent does it all.</li>
              Because great art deserves to be seen. And great collectors deserve a seamless way to find it.
              <strong>Welcome to Velvent—where artists thrive, and collectors explore the art they’ve been searching for. No limits. No compromises. Just pure artistic brilliance.</strong>
              </ul>
            </div>
            <div className="flex flex-col gap-3 justify-center">
              <h1 className='text-lg font-semibold'>Have more questions?</h1>
              <Link
                href="/faq"
                className="text-lg text-white link text-center rounded-lg"
              >
                FAQ's
              </Link>
              <Link
                href="/contact"
                className="text-lg text-white link text-center rounded-lg"
              >
                Contact Us
              </Link>
              <br />
              <br />
            </div>
          </div>
        </div>
      </section>
      <Image
        src="https://images.unsplash.com/photo-1577083165633-14ebcdb0f658?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        height={1000}
        width={1000}
        alt="art"
        className=" hidden h-full object-cover md:block max-w-[50%]"
      />
    </div>
  )
}

export default page


export async function generateMetadata(
  parent: ResolvingMetadata 
): Promise<Metadata> {
  return {
    title: "About | Valvent",
  }
}

