"use server"
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function createOnRampTransaction(amount:number,bank:string){
    try {
        const session = await getServerSession(authOptions)
        const token = Math.random().toString()
        const userId = session.user.id
        if(!userId){
            return NextResponse.json({message:"User not found!"},{status:400})
        }

        await prisma.onRampTransaction.create({
            data:{
                amount:amount,
                provider:bank,
                startTime: new Date(),
                userId:Number(userId),
                status:'Processing',
                token:token
            }
        })

        return NextResponse.json({message:"On Ramp Transaction added"},{ status:201 })
    } catch (error) {
        return NextResponse.json(error,{status:500})
    }
}