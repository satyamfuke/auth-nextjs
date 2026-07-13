import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";

connect();

export async function POST(request: NextRequest) {
    try{
        const requestBody = await request.json();
        const {username, email, password} = requestBody;
        console.log(requestBody);
        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if(existingUser){
            return NextResponse.json({error:"User already exists"}, {status:400});
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        });
        const savedUser = await newUser.save();
        return NextResponse.json({message: "User created successfully", user: savedUser}, {status:201});
    }catch (error) {
        return NextResponse.json({error: "Internal Server Error"}, {status:500});
    }
}
