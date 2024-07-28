import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export { default } from "next-auth/middleware";
 

export async function middleware(request:NextRequest){
  console.log("secreyt",process.env.NEXT_PUBLIC_JWT_SECRET)
  const token = await getToken({req:request,secret:process.env.NEXT_PUBLIC_JWT_SECRET})
  console.log("token 2ds,nfksjdnvkzjfndskafjnv",token)
  const url = request.nextUrl 
  if(token &&
    (
      url.pathname.startsWith('/signup') ||
      url.pathname.startsWith('/login') 
    )
    ){
      return NextResponse.redirect(url.origin + '/dashboard')
    }

    if(!token &&
      (
        url.pathname.startsWith('/dashboard') ||
        url.pathname.startsWith('/transfer') ||
        url.pathname.startsWith('/p2p') ||
        url.pathname.startsWith('/transactions')
      )
      ){
        return NextResponse.redirect(url.origin + '/login')
      }

    // return NextResponse.next()
}
export const config = {
    // Routes excluding the middleware to run on 
    /* 
        1. Public assests
        2. sign in page
        3. login page
        4. / (home page)
    */

    // matcher: [
    //   '/((?!api|static|.*\\..*|_next|_next/static|signup|login|_next/image|auth|favicon.ico|robots.txt|images|$).*)','/dashboard'
    // ],
    matcher:[
      '/signup',
      '/login',
      '/dashboard',
      '/transfer' 
    ]
  };