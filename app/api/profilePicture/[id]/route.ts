// pages/api/images/[id]/route.ts
import { NextResponse, NextRequest } from "next/server";
import { connectDB } from '../../../../lib/mongodb';
import ProfilePicture from '../../../../models/ProfilePicture';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();
    const { id } = params; // Récupération de l'ID depuis l'URL

    try {
        const image = await ProfilePicture.findById(id);

        if (!image) {
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }

        return NextResponse.json(image);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
