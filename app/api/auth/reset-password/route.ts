// app/api/auth/reset-password/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";

const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{8,}$/;

function validatePassword(password: string): string | null {
    if (!passwordRegex.test(password)) {
        return "Password must have at least one uppercase letter, one lowercase letter, one number, and one special character.";
    }
    return null;
}

export async function POST(request: Request) {
    const { token, password } = await request.json();
    if (!token || !password) {
        return NextResponse.json({ error: "Token and password are required" }, { status: 400 });
    }

    const validationError = validatePassword(password);
    if (validationError) {
        return NextResponse.json({ error: validationError }, { status: 400 });
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

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Update the user's password and remove the reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save({ validateModifiedOnly: true });

    return NextResponse.json({ message: "Password reset successful" });
}