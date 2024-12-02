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

export async function POST(request: NextRequest) {
    await connectDB();

    try {
        const { name, price, stock, sold } = await request.json();

        if (!name || name.trim() === "") {
            return NextResponse.json(
                { error: "product cannot be empty." },
                { status: 400 }
            );
        }

        if (typeof price !== "number" || price < 0) {
            return NextResponse.json(
                { error: "price count must be a non-negative number." },
                { status: 400 }
            );
        }

        if (typeof stock !== "number" || stock < 0) {
            return NextResponse.json(
                { error: "stock count must be a non-negative number." },
                { status: 400 }
            );
        }

        if (typeof sold !== "number" || sold < 0) {
            return NextResponse.json(
                { error: "sold count must be a non-negative number." },
                { status: 400 }
            );
        }

        const newBest = new Best({ name, price, stock, sold });
        const savedBest = await newBest.save();

        return NextResponse.json(savedBest);
    } catch (err: any) {
        // Gérer les erreurs de duplication de clé
        if (err.code === 11000) { // E11000 est le code d'erreur pour duplicate key
            return NextResponse.json(
                { error: "Product already exists." },
                { status: 400 }
            );
        }
    }
}

export async function DELETE(request: NextRequest) {
    await connectDB();

    try {
        const { name } = await request.json();

        const deletedProduct = await Best.findOneAndDelete({ name });

        if (!deletedProduct) {
            return NextResponse.json(
                { error: "Product not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(deletedProduct); // Retourner le label supprimé pour le front
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}