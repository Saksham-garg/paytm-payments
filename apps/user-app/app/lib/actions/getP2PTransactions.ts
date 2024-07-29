"use server"
import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"
import { number } from "zod"


export const P2PTransactions = async() => {
    const session = await getServerSession(authOptions)
    if(!session?.user){
        return {message:"User not authorised!",status:404}
    }
    
    const transactions = await prisma.user.findMany({
        where:{
            id: Number(session.user.id)
        },
        select:{
            name:true,
            receivedTransfers:true,
            sendTransfers:true,
            number:true
        }
    })
    return transactions.map((tx) => ({
        receivedTransfers:tx.receivedTransfers,
        sendTransfers:tx.sendTransfers,
        name:tx.name,
        number:tx.number
    }))[0]
}