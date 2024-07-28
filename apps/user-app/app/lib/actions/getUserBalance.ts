"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"

export const getUserBalance = async() => {
    const session = await getServerSession(authOptions)
    if(!session?.user){
        return { message:"Unauthorised User",status:404}
    }

    const balance = await prisma.balance.findFirst({
        where:{
            userId:Number(session.user.id)
        }
    })
    console.log(balance)
    return balance
}