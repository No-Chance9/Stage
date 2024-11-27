import { connectDB } from "@/lib/mongodb";
import Best from "@/models/BestSelling";
import { error } from "console";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    await connectDB();

    try {
        const values = await Best.find({});

        return NextResponse.json(values);

    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}

export async function PUT(request: NextRequest) {
    await connectDB();

    try {
        const { stock, name, status } = await request.json();

        const updatedProduct = await Best.findOneAndUpdate(
            { name },
            { $set: { stock, status } },
            { new: true }
        );

        return NextResponse.json(updatedProduct);

    } catch (err: any) {
        console.error("Error during update:", err.message);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

