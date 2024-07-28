import db from "@repo/db/client";
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs";
import { authLoginSchema } from "@repo/common/schema";
import { NextResponse } from "next/server";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
      CredentialsProvider({
          name: 'Credentials',
          credentials: {
            email: { label: "Email", type: "text", placeholder: "abc@xyz.com", required: true },
            password: { label: "Password", type: "password", required: true }
          },
          // TODO: User credentials type from next-auth
          async authorize(credentials: any):Promise<any> {
            // Do zod validation, OTP validation here
            const validateSchema = authLoginSchema.safeParse(credentials)
            if(!validateSchema.success){
                throw NextResponse.json({
                    message:'Invalid Inputs'
                },{status:411})
            }
            const existingUser = await db.user.findFirst({
                where: {
                    email: credentials.email
                }
            });
            if (existingUser) {
                const passwordValidation = await bcrypt.compare(credentials.password, existingUser.password);
                if (passwordValidation) {
                    return {
                        id: existingUser.id.toString(),
                        phone: existingUser.number,
                        email: existingUser.email
                    }
                }
                return null;                    
            }else{
                throw NextResponse.json({
                    message:'User not found!'
                },{status:411})
            }
          },
        })
    ],
    session:{
        strategy:'jwt'
    },
    pages:{
        signIn: process.env.NEXTAUTH_URL + '/login'
    },
    secret: process.env.NEXT_PUBLIC_JWT_SECRET || "secret",
    callbacks: {
        // TODO: can u fix the type here? Using any is bad
        async jwt({token,user,account}){
            console.log(account)
            console.log(token)
            if(user){
                token.accessToken = account?.access_token
                token.email = user.email
                token.number = user.number
                token.id = user.id
            }
            return Promise.resolve(token);
        },
        async session({ token, session }: any) {
            console.log("token",token)
            if(token){
                session.accessToken = token.accessToken
                session.user.id = token.id
                session.user.email = token.email
                session.user.number = token.number
            }
            // you might return this in new version
            return Promise.resolve(session)
        },
        async redirect({ url, baseUrl }:any){         
            return url.startsWith(baseUrl)
            ? Promise.resolve(url)
            : Promise.resolve(baseUrl);
        }
    }

  }
  