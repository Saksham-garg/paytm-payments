import { z } from 'zod'

export const transferP2P = z.object({
    amount:z.number().gt(0,"Amount must be greater than 0"),
    number: z.string()
})

export interface balance{
    id: number 
    userId: number 
    amount: number
    locked: number
}

export interface OnRampTransactionInterface {
    time: Date
    amount: number
    status: string
    provider: string
    token: string
    userId: number
}