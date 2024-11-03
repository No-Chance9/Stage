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

// export async function PUT(request: Request) {
//     await connectDB();
//     console.log("Database connected successfully");

//     try {
//         const { email, updatedData } = await request.json();
//         console.log("Assurez-vous que les :", email,updatedData);

//         if (!email || !updatedData) {
//             return NextResponse.json({ error: "Missing email or updatedData" });
//         }

//         const updatedUser = await User.findOneAndUpdate(
//             {email}, 
//             {...updatedData}, 
//             { new: true });

//         if (!updatedUser) {
//             return NextResponse.json({ error: "User not found" });
//         }

//         return NextResponse.json(updatedUser);
//     } catch (err: any) {
//         console.error("Error during update:", err);
//         return NextResponse.json({ error: err.message });
//     }
// }

export async function PUT(request: Request) {
    await connectDB();
    console.log("Database connected successfully");

    try {
        const { email, updatedData } = await request.json();
        console.log("Received data:", email, updatedData);

        if (!email || !updatedData) {
            console.error("Missing email or updatedData");
            return NextResponse.json({ error: "Missing email or updatedData" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email },
            { $set: updatedData },
            { new: true }
        );

        if (!updatedUser) {
            console.error("User not found for email:", email);
            return NextResponse.json({ error: "User not found" });
        }

        console.log("User updated successfully:", updatedUser);
        return NextResponse.json(updatedUser);
    } catch (err: any) {
        console.error("Error during update:", err);
        return NextResponse.json({ error: err.message });
    }
}



