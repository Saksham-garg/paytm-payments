import NextAuth from "next-auth"
import { DefaultSession } from 'next-auth'
import { JWT } from "next-auth/jwt"

declare module 'next-auth'{
    interface User{
        id: string,
        email: string,
        number: string
    }
    interface Session{
      user:{
        id: string,
        email: string,
        number: string
      } & DefaultSession['user']
    } 
}


declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT {
    id: string,
    email: string,
    number: string
  }
}
