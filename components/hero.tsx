"use client"

import Link from 'next/link'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import { Button } from './ui/button'

const HeroSection = () => {

const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const imageElement = imageRef.current;

    const handleScroll = () => {

        if(!imageElement){
            return;
        }

      const scrollPosition = window.scrollY;
      const scrollThreshold = 100;

      if (scrollPosition > scrollThreshold) {
        imageElement.classList.add("scrolled");
      } else {
        imageElement.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  return (
    <section id="about-us" className="w-full pt-36 md:pt-48 pb-10">
        <div className="space-y-6 text-center">
            <div className="space-y-6 mx-auto">
                <h1 className="text-5xl font-bold md:text-6xl lg:text-7xl xl:text-8xl gradient gradient-title animate-gradient">
                    The Best Career Guide
                </h1>
                <h2 className="text-5xl font-bold md:text-4xl lg:text-5xl xl:text-6xl gradient-yellow gradient-title animate-gradient">
                  Not just an app but your own brother.
                  </h2>
                <p className="mx-auto max-w-[600px] text-muted-foreground md:text-xl">
                    Let&apos;s face it. Human career advices are monotonous and they disappoint. 
                    You are in luck because Growvia won&apos;t. We look forward to sharing your journey,
                    all nighters and commitment to your skills.
                </p>
            </div>

            <div className="flex justify-center space-x-4" >
                <Link href = "/dashboard">
                <Button size="lg" className='px-8'>
                    Get Started
                </Button>
                </Link>
                {/* Link to add demo video */}
                {/* <Link href = "/youtube link">
                <Button size="lg" className='px-8' variant= "outline">
                    Get Started
                </Button>
                </Link> */}
            </div>

            <div className="hero-image-wrapper mt-5 md:mt-0">
                <div ref={imageRef} className="hero-image">
                    <Image 
                    src={'/banner01.jpg'}
                    width={1280}
                    height={720} 
                    alt="banner Growvia"
                    className='rounded-lg shadow-2xl border mx-auto'
                    priority
                     />
                </div>
            </div>
        </div>
    </section>
  )
}

export default HeroSection