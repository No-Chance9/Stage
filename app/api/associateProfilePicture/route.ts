import { NextResponse, NextRequest } from "next/server";
import { connectDB } from '../../../lib/mongodb';
import User from '../../../models/User';
import ProfilePicture from '../../../models/ProfilePicture';

export async function POST(request: NextRequest, response: NextResponse) {
    console.log("POST request received");
    // Connectez-vous à la base de données
    await connectDB();

    try {
        const { email, imageId } = await request.json();

        // Trouve l'utilisateur et l'image
        const user = await User.findOne(email);
        const image = await ProfilePicture.findById(imageId);

        if (!user) {
            console.error("User not found for email:", email);
            return NextResponse.json({ error: "User not found" }, { status: 404 });
        }

        if (!image) {
            console.error("Image not found for email:", imageId);
            return NextResponse.json({ error: "Image not found" }, { status: 404 });
        }
        // Associe l'image de profil à l'utilisateur
        user.profilePicture = image._id;
        await user.save();


        return NextResponse.json({ message: 'Profile picture linked successfully', user });
    } catch (error) {
        console.error("Erreur lors de l'association de l'image de profil:", error);
        return NextResponse.json({ error: `Something went wrong: ${error}` });
    }
}

