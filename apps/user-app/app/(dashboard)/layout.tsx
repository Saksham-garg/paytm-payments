"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/AppBar";
import SideBar from "@repo/ui/SideBar";

export default function Page({children}:{children:React.ReactNode}): JSX.Element {
  const session = useSession();
  return (
   <div className="flex flex-col">
      <div className="w-full border-b">
        <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user} />
      </div>
      <div className="flex">
        <SideBar />
        <div className="p-6 w-full">
            {children}
        </div>
      </div>
   </div>
  );
}