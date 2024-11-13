import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { connectDB } from '../../../lib/mongodb';
import Image from '../../../models/ProfilePicture';

// Configuration du dossier de téléchargement
const uploadDir = path.join(process.cwd(), 'public/photoProfil');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// API Route pour le téléchargement et l'enregistrement en BDD
export async function POST(req: Request) {
    await connectDB(); // Connexion à MongoDB

    const formData = await req.formData();
    const file = formData.get('file') as File;
    const description = formData.get('description') as string;

    if (!file) {
        return NextResponse.json({ error: 'File is missing' }, { status: 400 });
    }

    // Enregistrer le fichier sur le serveur
    const filePath = path.join(uploadDir, file.name);
    const buffer = Buffer.from(await file.arrayBuffer());
    fs.writeFileSync(filePath, buffer);

    // Sauvegarder les métadonnées du fichier dans MongoDB
    try {
        const newImage = await Image.create({
            fileName: file.name,
            path: `/photoProfil/${file.name}`,
            description: description || '',
        });
        return NextResponse.json({ message: 'File uploaded successfully', file: newImage });
    } catch (error) {
        console.error("Erreur lors de l'enregistrement en BDD :", error);
        return NextResponse.json({ error: `Failed to save file metadata: ${error}` }, { status: 500 });
    }
}
