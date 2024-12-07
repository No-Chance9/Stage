import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await connectDB();
    try {
        const { searchParams } = new URL(request.url); // Extract query parameters
        const email = searchParams.get("email"); // Check for the `email` parameter

        if (email) {
            // If an email parameter is provided, fetch the specific user
            const user = await User.findOne({ email, isActive: true });

            if (!user) {
                return NextResponse.json({ error: "User not found" }, { status: 404 });
            }

            return NextResponse.json(user);
        } else {
            // If no email is provided, return all active users
            const activeUsers = await User.find({ isActive: true });
            return NextResponse.json(activeUsers);
        }
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest) {
    console.log("PUT request received");
    await connectDB();

    try {
        console.log("Attempting to parse JSON from request body");
        const { email, name, surname, adresse, ville, code, role } = await request.json();
        console.log("Parsed JSON:", { email, surname });

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { name, surname, adresse, ville, code, role } },
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

// Route handler to "delete" a user (soft delete)
export async function DELETE(request: NextRequest) {
    await connectDB();
    const { email, isActive } = await request.json();

    try {
        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: { isActive }}, 
            { new: true }
        );

        if (!updatedUser) {
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "User soft deleted successfully", user: updatedUser });
    } catch (error) {
        return NextResponse.json({ error: `Failed to soft delete user:` }, { status: 500 });
    }
}

