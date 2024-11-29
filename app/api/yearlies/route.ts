import { connectDB } from "@/lib/mongodb";
import Yearly from "@/models/Yearly";
import { NextResponse, NextRequest } from "next/server";

export async function GET() {
    await connectDB();

    try {
        const values = await Yearly.find({});

        return NextResponse.json(values);

    } catch (err: any) {
        return NextResponse.json({ error: err.message });
    }
}

export async function POST(request: NextRequest) {
    await connectDB();

    try {
        const { label, value } = await request.json();

        if (!label || label.trim() === "") {
            return NextResponse.json(
                { error: "Label cannot be empty." },
                { status: 400 }
            );
        }

        if (typeof value !== "number" || value < 0) {
            return NextResponse.json(
                { error: "Visitors count must be a non-negative number." },
                { status: 400 }
            );
        }

        const newYearly = new Yearly({ label, value });
        const savedYearly = await newYearly.save();

        return NextResponse.json(savedYearly);
    } catch (err: any) {
        // Gérer les erreurs de duplication de clé
        if (err.code === 11000) { // E11000 est le code d'erreur pour duplicate key
            return NextResponse.json(
                { error: "Label already exists." },
                { status: 400 }
            );
        }
    }
}

export async function DELETE(request: NextRequest) {
    await connectDB();

    try {
        const { label } = await request.json();

        const deletedLabel = await Yearly.findOneAndDelete({ label });

        if (!deletedLabel) {
            return NextResponse.json(
                { error: "Label not found." },
                { status: 404 }
            );
        }

        return NextResponse.json(deletedLabel); // Retourner le label supprimé pour le front
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}