import {connect} from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request: NextRequest){
    try{
        const requestBody = await request.json();
        const {email,password} = requestBody;
        console.log(requestBody);
        // Check if user exists
        const existingUser = await User.findOne({email});
        if(!existingUser){
            return NextResponse.json({error:"User does not exist"}, {status:404});
        }
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if(!isPasswordCorrect){
            return NextResponse.json({error:"Invalid credentials"}, {status:401});
        }

        const tokenData = {
            id: existingUser._id,
            email: existingUser.email,
            username: existingUser.username
        }

        const token = jwt.sign(tokenData, process.env.TOKEN_SECRET!, {expiresIn:"1d"});
        const response = NextResponse.json({message:"Login successful", token}, {status:200});
        response.cookies.set("token", token, {httpOnly:true});
        return response;

    }catch(error){
        return NextResponse.json({error:"Internal Server Error"},{status:500});
    }
}