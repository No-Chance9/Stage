// app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
    const { token, password } = await request.json();
    if (!token || !password) {
        return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
    }

    await connectDB();

    // Hash the token and find the user
    const hashedToken = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
        resetPasswordToken: hashedToken,
        resetPasswordExpires: { $gt: Date.now() }, // Ensure the token is not expired
    });

    if (!user) {
        return NextResponse.json(
            { error: "Invalid or expired reset token." },
            { status: 400 }
        );
    }

    // Hash the new password and save it
    user.password = await bcrypt.hash(password, 12);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    return NextResponse.json({ message: "Password reset successful" });
}