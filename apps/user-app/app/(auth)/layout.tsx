"use client"
import React from 'react'
import Image from 'next/image'
const  layout = ({children}: Readonly<{ children: React.ReactNode}>) => {
  return (
    <div className='grid grid-cols-2'>
        <div className="flex items-center justify-center min-h-screen bg-[url('/bg-left.png')] w-full object-cover p-4">
              <div className="text-white">
                  <div className="flex items-center gap-3.5 justify-center">
                      <img src='./logo.svg' alt='logo'/>
                      <p className='font-normal text-3xl'>PayZee</p>
                  </div>
                  <Image 
                    src="/payment-main.png"
                    height={400}
                    width={500}
                    alt='main'
                  />
                  <p className='font-bold font-sans text-center text-3xl'>Make your payments at lightning fast.</p>
                  <p className='font-thin font-sans text-center text-xl mt-3'>What you are waiting for, let's connect</p>
              </div>
        </div>
        {children}
    </div>
  )
}

export default layout