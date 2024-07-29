"use server"

import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"

export const P2PTransfer = async(to:string,amount:number) => {
    try {
        const session = await getServerSession(authOptions)
        if(!session?.user){
            return {message:'User not found!',status:404}
        }

        const toUser = await prisma.user.findFirst({
            where:{
                number:to
            }
        })

        if(!toUser){
            return { message:"To Number not found!",status:"404"}
        }

        await prisma.$transaction(async (tx) => {
            try {
            await tx.$queryRaw`SELECT * FROM "Balance" WHERE "userId" = ${Number(session.user?.id)} FOR UPDATE`
            
            const fromBalance = await prisma.balance.findFirst({
                where:{
                    userId:Number(session.user?.id)
                }
            })
            if(!fromBalance || fromBalance?.amount < amount){
                throw new Error("Insufficient balance")
            }

            await tx.balance.update({
                where:{
                    userId:Number(session.user?.id)
                },
                data:{
                    amount:{
                        decrement:amount
                    }
                }
            })

            await tx.balance.update({
                where:{
                    userId:Number(toUser.id)
                },
                data:{
                    amount:{
                        increment:amount
                    }
                }
            })

       
            await tx.p2PTransaction.create({
                data:{
                    fromUserId: Number(session.user?.id),
                    toUserId: Number(toUser.id),
                    amount: amount,
                    timestamp: new Date()
                }
            })
            
           } catch (error:any) {
                throw new Error(error)
           }
        })
        return { message:`Successfully done payment to ${to}`, status:201}
    } catch (error) {
        console.log(error)
        return {message:error,status:500}
    }
}