import { getServerSession } from "next-auth"
import { authOptions } from "../auth"
import prisma from "@repo/db/client"

export const getOnRampTransactions = async() => {
    const session = await getServerSession(authOptions)
    const txns = await prisma.onRampTransaction.findMany({
        where:{
            userId: Number(session.user.id)
        }
    })

    return txns.map((txn) => ({
        time: txn.startTime,
        amount: txn.amount,
        status: txn.status,
        provider: txn.provider
    }))
}