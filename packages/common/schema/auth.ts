import { z } from "zod";

export const authSchema = z.object({
    email: z.string().email({message:"Email is invalid"}),
    phone: z.string().refine((value) => /^[+]{1}(?:[0-9-()/.]\s?){6,15}[0-9]{1}$/.test(value)),
    password: z.string().min(3,{message:"Password atleast have 6 characters"}).max(20,{message:'Password cannot be more than 20 characters'})
})

export const authLoginSchema = z.object({
    email: z.string().email({message:"Email is invalid"}),
    password: z.string().min(5,{message:"Password atleast have 5 characters"}).max(20,{message:'Password cannot be more than 20 characters'})
})

export type authTypeSchema = z.infer<typeof authSchema>
export default z;