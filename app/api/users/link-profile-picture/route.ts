// app/api/users/link-profile-picture/route.ts
import { NextResponse } from 'next/server';
import { connectDB } from '../../../../lib/mongodb';
import User from '../../../../models/User';
import ProfilePicture from '../../../../models/ProfilePicture';

export async function POST(request: Request) {
    await connectDB();
    try {
        const { email, imageId } = await request.json();

        // Trouver l'utilisateur par email
        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: 'User not found' }, { status: 404 });
        }

        // Vérifier si l'image existe
        const image = await ProfilePicture.findById(imageId);
        if (!image) {
            return NextResponse.json({ error: 'Image not found' }, { status: 404 });
        }

        // Associer l'image à l'utilisateur
        user.profilePicture = image._id;
        await user.save();

        return NextResponse.json({ message: 'Profile picture linked successfully', user });
    } catch (error) {
        console.error("Erreur lors de l'association de l'image de profil:", error);
        return NextResponse.json({ error: `Something went wrong: ${error}` }, { status: 500 });
    }
}
