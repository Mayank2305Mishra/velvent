"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDownIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from 'next/link'
import React from 'react'
import { CalendarIcon, MapPinIcon, ArrowRightIcon } from "lucide-react"
import Image from 'next/image'
import { motion } from "framer-motion"
import { Instagram, Facebook, Twitter } from "lucide-react"
import VelventIcon from "@/components/velventUI/VelventIcon"
import { useRouter } from "next/navigation"
import PWAInstallButton from "@/components/velventUI/PWAInstallButton"


const artworks = [
  {
    id: 1,
    title: "Monalisa",
    artist: "Da Vinci",
    image: "https://images.unsplash.com/photo-1637329097076-5d0209af3ef9?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    medium: "Monalisa",
    year: "1600"
  },
  {
    id: 2,
    title: "The Last Supper",
    artist: "Da Vinci",
    image: "https://images.unsplash.com/photo-1734966901584-18325ef39e03?q=80&w=1394&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    medium: "The Last Supper",
    year: "1600"
  },
  {
    id: 3,
    title: "Abstract",
    artist: "Koi Bhi",
    image: "https://images.unsplash.com/photo-1567095761054-7a02e69e5c43?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    medium: "Acrylic on Canvas",
    year: "2025"
  }
]

const exhibitions = [
  {
    id: 1,
    title: "Modern Perspectives",
    date: "Jun 15 - Aug 30, 2025",
    location: "Main Gallery, Floor 2",
    description: "An exploration of contemporary artistic viewpoints challenging traditional perceptions of space, form, and meaning.",
    featured: true
  },
  {
    id: 2,
    title: "Chromatic colors",
    date: "Jul 10 - Sep 25, 2025",
    location: "East Wing",
    description: "A vibrant collection examining the emotional and psychological impact of color through various mediums.",
    featured: false
  },
  {
    id: 3,
    title: "Digital Art",
    date: "Aug 5 - Oct 15, 2025",
    location: "Innovation Space",
    description: "Exploring the intersection of technology and artistic expression through interactive installations and digital art.",
    featured: true
  }
]

const artists = [
  {
    id: 1,
    name: "Da Vinci",
    specialty: "Natural Arts",
    image: "https://images.unsplash.com/photo-1733578873713-6a07116bcd60?q=80&w=1572&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Internationally acclaimed for her bold use of color and texture, Sophia's work explores themes of memory and identity through abstract forms."
  },
  {
    id: 2,
    name: "Pikaso",
    specialty: "Modern Art",
    image: "https://plus.unsplash.com/premium_photo-1677609953776-ca1b75fa42e2?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Wei's innovative approach to sculpture combines traditional materials with digital elements, creating immersive works that challenge spatial perception."
  },
  {
    id: 3,
    name: "Vincent Van Gogh",
    specialty: "Surrealist Painter",
    image: "https://images.unsplash.com/photo-1545989253-02cc26577f88?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    bio: "Drawing from both classical techniques and modern influences, Elena creates dreamlike compositions that invite viewers into richly detailed allegorical worlds."
  }
]

const page = () => {
  const [scrollY, setScrollY] = useState(0)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToContent = () => {
    const featuredSection = document.getElementById("featured")
    if (featuredSection) {
      featuredSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className=" artifika-regular  ">
      <section className="relative w-full h-screen overflow-hidden">
        {/* Background Image with Parallax */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1549366970-4efc91d3af9f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
          }}
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-light-500/5" />
        <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-center  items-center">
          {/* Main Content */}
          <div className="max-w-3xl ">
            <h1
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-tight"
              style={{
                textShadow: "0 2px 20px rgba(0,0,0,0.2)"
              }}
            >
              BAZAAR OF <span className="text-transparent bg-clip-text bg-gradient-to-t  from-velvent/35 to-velvent">UNFORESEEN ART</span>
            </h1>

            <p className="text-lg md:text-xl  text-white mb-8 max-w-2xl">
              Discover extraordinary art collections and exhibitions curated for the modern art enthusiast. Experience creative expression in its most captivating forms.
            </p>

            <div className="flex flex-col md:items-center md:justify-center sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-velvent text-lg  text-white hover:bg-black/90 transition-all"
                onClick={() => router.push("/auth/artist")}
              >
                Join As Artist
              </Button>
              <Button
                size="lg"
                className="text-lg  border-1 border-velvent/75 bg-velvent/40 text-white hover:bg-white/10 transition-all backdrop-blur-lg"
                onClick={() => router.push("/auth/user")}
              >
                Explore Art
              </Button>
            </div>
          </div>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
            <button
              onClick={scrollToContent}
              className="flex flex-col items-center text-white/70 hover:text-white/90 transition-colors"
            >
              <span className="text-sm mb-2">Scroll to explore</span>
              <ArrowDownIcon
                className={cn(
                  "h-6 w-6 animate-bounce"
                )}
              />
            </button>
          </div>
        </div>
      </section>
      <section id="featured" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Featured Artworks</h2>
            <p className="text-muted-foreground text-lg">
              Discover our curated selection of exceptional pieces from renowned and emerging artists.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {artworks.map((artwork) => (
              <motion.div
                key={artwork.id}
                className="group relative overflow-hidden rounded-lg aspect-[3/4] bg-muted"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: artwork.id * 0.1 }}
                onMouseEnter={() => setHoveredId(artwork.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                <div className="absolute inset-0 bg-black/20 z-10 transition-opacity duration-300 group-hover:opacity-0" />

                <Image
                  src={artwork.image}
                  alt={artwork.title}
                  fill
                  className={cn(
                    "object-cover transition-transform duration-700",
                    hoveredId === artwork.id ? "scale-110" : "scale-100"
                  )}
                />

                <div className="absolute inset-0 flex flex-col justify-end p-6 z-20">
                  <div className={cn(
                    "transition-transform duration-500",
                    hoveredId === artwork.id ? "translate-y-0" : "translate-y-8"
                  )}>
                    <h3 className="text-xl font-semibold text-white mb-1">{artwork.title}</h3>
                    <p className="text-white/80 mb-2">{artwork.artist}</p>

                    <div className={cn(
                      "flex gap-4 text-sm text-white/70 transition-opacity duration-300",
                      hoveredId === artwork.id ? "opacity-100" : "opacity-0"
                    )}>
                      <span>{artwork.medium}</span>
                      <span>{artwork.year}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="exhibitions" className="py-20 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Current & Upcoming Exhibitions</h2>
            <p className="text-muted-foreground text-lg">
              Immerse yourself in our carefully curated exhibitions showcasing diverse artistic perspectives.
            </p>
          </div>

          <div className="space-y-8 text-white">
            {exhibitions.map((exhibition, index) => (
              <motion.div
                key={exhibition.id}
                className={`rounded-xl overflow-hidden shadow-md bg-card ${exhibition.featured ? "border-2 border-primary/20" : ""
                  }`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="p-6 md:p-8 flex bg-velvent/40 backdrop-blur-3xl text-white flex-col md:flex-row gap-6 items-start">
                  <div className="md:w-3/4">
                    {exhibition.featured && (
                      <div className="inline-block px-3 py-1 bg-primary/10 text-xs rounded-full mb-4 text-white">
                        Featured Exhibition
                      </div>
                    )}

                    <h3 className="text-2xl font-semibold mb-3">{exhibition.title}</h3>

                    <p className="mb-6 text-white">
                      {exhibition.description}
                    </p>

                    <div className="flex flex-col  sm:flex-row gap-4 sm:gap-6 text-sm text-white">
                      <div className="flex items-center gap-2">
                        <CalendarIcon className="h-4 w-4" />
                        <span>{exhibition.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPinIcon className="h-4 w-4" />
                        <span>{exhibition.location}</span>
                      </div>
                    </div>
                  </div>

                  <div className="md:w-1/4 flex justify-start md:justify-end">
                    <Button className="group">
                      Learn more
                      <ArrowRightIcon className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section id="artists" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Artist Spotlight</h2>
            <p className="text-muted-foreground text-lg">
              Meet the visionary creators behind our most compelling works and exhibitions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {artists.map((artist, index) => (
              <motion.div
                key={artist.id}
                className="group bg-card rounded-xl overflow-hidden shadow-md"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <div className="h-64 relative overflow-hidden">
                  <Image
                    src={artist.image}
                    alt={artist.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-semibold text-white">{artist.name}</h3>
                    <p className="text-white/80 text-sm">{artist.specialty}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-muted-foreground mb-4">
                    {artist.bio}
                  </p>

                  <Button className="w-full text-lg text-white bg-velvent/60 ">
                    View Portfolio
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <section className="py-20 bg-background">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Add Velvent to Home Screen</h1>
        <PWAInstallButton />
      </section>
      <footer className="bg-muted py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <VelventIcon height={80} width={80} />
              </div>
              <p className="text-muted-foreground mb-4">
                Bazaar of Unforeseen Art
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Instagram className="h-8 w-8" />
                  <span className="sr-only">Instagram</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Facebook className="h-8 w-8" />
                  <span className="sr-only">Facebook</span>
                </Button>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Twitter className="h-8 w-8" />
                  <span className="sr-only">Twitter</span>
                </Button>
              </div>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Current Exhibitions
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Visit Artists Profile
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                    Art Gallery
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors">
                    Contact Us
                  </Link>
                </li>
                <li>
                  <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors">
                    About Us
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Contact</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>General: velventbazaar@gmail.com</li>
                <li>Phone: +91 98********</li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} velvent. All rights reserved.
            </p>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-foreground transition-colors">
                About us
              </Link>
              <Link href="/faq" className="hover:text-foreground transition-colors">
                FAQ's
              </Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default page