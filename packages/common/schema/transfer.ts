import { z } from 'zod'

export const transferP2P = z.object({
    amount:z.number().gt(0,"Amount must be greater than 0"),
    number: z.string()
})