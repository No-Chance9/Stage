"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export const register = async (values: any) => {
    const { email, password, name, surname } = values;

    try {
        // Vérifiez explicitement la longueur du mot de passe
        if (!password || password.length < 8) {
            return {
                error: "Password must be at least 8 characters long",
            };
        }

        await connectDB();

        const userFound = await User.findOne({ email });
        if (userFound) {
            return {
                error: "Email already exists!",
            };
        }

        const hashedPassword = await bcrypt.hash(password, 10); // Hachage uniquement après validation
        const user = new User({
            name,
            email,
            password: hashedPassword,
            surname,
        });

        await user.save();

        return { success: true };
    } catch (error: any) {
        console.error("Error during registration:", error);

        // Vérifier si c'est une erreur de validation Mongoose
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(
                (err: any) => err.message
            );
            return { error: errors.join(", ") }; // Retourner tous les messages d'erreur
        }

        // Autres erreurs
        return { error: "An error occurred during registration. Please try again." };
    }
};