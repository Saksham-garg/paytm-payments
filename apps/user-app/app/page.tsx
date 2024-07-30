"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/AppBar";
import Image from 'next/image'
import React from "react";

export default function Page({children}:{children:React.ReactNode}) {
  const session = useSession();
  return (
   <div className="flex flex-col">
      <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
      <div className="flex w-[1400px] mx-auto relative"> 
          <div className="rounded-t-3xl bg-green-200 z-[-10] bg-opacity-20 h-[calc(100vh-72px)] max-w-5xl w-full">
          </div>
            
            </div>
            <div className="mt-[10rem] ml-[8rem] w-full absolute bottom-0">
              <div className="flex">
                <div className="text-[6em] text-black max-w-xl leading-none">
                    Fast, safe social payments
                    <p className="mt-9 text-2xl text-gray-400">Pay, get paid grow a bussiness, and more, Join the tens of millions of people in Payzee.</p>
                </div>
                  <Image
                  src='/main-page.png'
                  alt="main"
                  width={650}
                  height={300}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
              </div>
      </div>
      {children}
   </div>
  );
}