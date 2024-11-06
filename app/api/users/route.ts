import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { error } from "console";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    await connectDB();
    try {
        const values = await User.find({});

        return NextResponse.json(values);

    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}


export async function PUT(request: NextRequest) {
    console.log("PUT request received");
    await connectDB();

    try {
        console.log("Attempting to parse JSON from request body");
        const { email, surname } = await request.json();
        console.log("Parsed JSON:", { email, surname });

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { surname } },
            { new: true }
        );

        if (!updatedUser) {
            console.error("User not found for email:", email);
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        console.log("User updated successfully:", updatedUser);
        return NextResponse.json(updatedUser);
    } catch (err: any) {
        console.error("Error during update:", err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

