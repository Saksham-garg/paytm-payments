export { default } from "next-auth/middleware";
 
export const config = {
    // Routes excluding the middleware to run on 
    /* 
        1. Public assests
        2. sign in page
        3. login page
        4. / (home page)
    */
    matcher: [
      '/((?!api|static|.*\\..*|_next|_next/static|signin|login|_next/image|auth|favicon.ico|robots.txt|images|$).*)',
    ],
  };