"use server"
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const register = async (values: any) => {
    const { email, password, name, surname } = values;

    try {
        await connectDB();

        const userFound = await User.findOne({ email });
        if (userFound) {
            return {
                error: 'Email already exists!'
            }
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({
            name,
            email,
            password: hashedPassword,
            surname,
        });
        const savedUser = await user.save();

    } catch (e) {
        console.log(e);
    }
}