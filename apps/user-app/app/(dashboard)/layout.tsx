"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/AppBar";
import SideBar from "@repo/ui/SideBar";
import { redirect } from 'next/navigation'
import { Suspense } from "react";
import Loader from "@repo/ui/Loader";


export default function Page({children}:{children:React.ReactNode}) {
  const session = useSession();
  return (
   <div className="flex flex-col">
      <div className="w-full border-b">
        <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
      </div>
      <div className="flex">
        <SideBar />
        <Suspense fallback={<Loader />}>
            <div className="p-6 w-full">
                {children}
            </div>
        </Suspense>
      </div>
   </div>
  );
}