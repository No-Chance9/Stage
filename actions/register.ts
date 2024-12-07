"use server";
import { connectDB } from "@/lib/mongodb";
import User from "@/models/User";
import Dashboard from "@/models/Dashboard";
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

        // Vérifier si l'utilisateur existe déjà
        const userFound = await User.findOne({ email });
        if (userFound) {
            return {
                error: "Email already exists!",
            };
        }

        // Hasher le mot de passe
        const hashedPassword = await bcrypt.hash(password, 10);

        // Créer un nouvel utilisateur
        const user = new User({
            name,
            email,
            password: hashedPassword,
            surname,
        });

        // Créer un Dashboard vide pour cet utilisateur
        const dashboard = new Dashboard({
            userId: user._id, // Lier le dashboard à l'utilisateur
            totaux: { visitors: 0, platforms: 0 },
            customerGrowthData: [],
            yearlyVisitors: [],
            bestSelling: [],
        });

        // Sauvegarder le Dashboard
        await dashboard.save();

        // Lier le Dashboard à l'utilisateur
        user.dashboard = dashboard._id;
        

        // Sauvegarder l'utilisateur
        await user.save();

        return { success: true };
    } catch (error: any) {
        console.error("Error during registration:", error);

        // Gérer les erreurs de validation Mongoose
        if (error.name === "ValidationError") {
            const errors = Object.values(error.errors).map(
                (err: any) => err.message
            );
            return { error: errors.join(", ") };
        }

        // Autres erreurs
        return { error: "An error occurred during registration. Please try again." };
    }
};