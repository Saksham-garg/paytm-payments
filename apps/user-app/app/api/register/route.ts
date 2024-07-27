import db from "@repo/db/client";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export const POST = async(req:Request) => {
    const { email,phone, password } = await req.json()
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const userExists = await db.user.findFirst({
            where:{
                email:email,
                number:phone
            }
        })
        if(userExists){
            return NextResponse.json("User already exists with this phone/email",{status:500})
        }
        const user = await db.user.create({
            data: {
                email: email,
                number: phone,
                password: hashedPassword
            }
        });
        
        return NextResponse.json({
            id: user.id.toString(),
            number: user.number,
            email: user.email
        },{status:201})
    } catch(e) {
        console.error(e);
        return NextResponse.json("Something went wrong.",{status:500})
    }
}