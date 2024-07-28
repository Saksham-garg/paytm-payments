"use server"
import { getServerSession } from "next-auth";
import { authOptions } from "../auth";
import prisma from "@repo/db/client";


export async function createOnRampTransaction(amount:number,bank:string){
    try {
        const session = await getServerSession(authOptions)
        const token = Math.random().toString()
        const userId = session?.user.id
        console.log("userId",userId)
        if(!userId){
            return {message:"User not found!"}
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

        return {message:"On Ramp Transaction added"}
    } catch (error) {
        return {message:error}
    }
}