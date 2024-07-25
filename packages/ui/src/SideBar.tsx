"use client"
import { ArrowRightLeft, ArrowUpRight, Clock3, HomeIcon } from 'lucide-react'
import React from 'react'
import Link from "next/link";
import { usePathname } from 'next/navigation';

type Props = {}

const SideBar = (props: Props) => {
    const pathname = usePathname()
  return (
    <div className='h-[calc(100vh-60px)] text-lg font-medium min-w-64 max-w-80 border-l border'>
        <Link href="/dashboard">
            <div className={`flex gap-4 items-center p-4 cursor-pointer hover:bg-slate-300 transition-colors ${pathname == '/dashboard'?'bg-slate-300':''}`}>
                <HomeIcon />
                <p>Home</p>
            </div>
        </Link>
        <Link href="/transfer">
            <div className={`flex gap-4 items-center p-4 cursor-pointer hover:bg-slate-300 transition-colors ${pathname == '/transfer'?'bg-slate-300':''}`}>
                <ArrowRightLeft />
                <p>Transfer</p>
            </div>  
        </Link>
        <Link href="/transactions">
            <div className={`flex gap-4 items-center p-4 cursor-pointer hover:bg-slate-300 transition-colors ${pathname == '/transactions'?'bg-slate-300':''}`}>
                <Clock3 />
                <p>Transactions</p>
            </div>
        </Link>
        <Link href="/p2p">
            <div className={`flex gap-4 items-center p-4 cursor-pointer hover:bg-slate-300 transition-colors ${pathname == '/p2p'?'bg-slate-300':''}`}>
                <ArrowUpRight />
                <p>P2P Transfer</p>
            </div>
        </Link>
    </div>
  )
}

export default SideBar