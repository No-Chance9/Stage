"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ForgotPassword() {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [showHomeButton, setShowHomeButton] = useState(false); // État pour afficher le bouton
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes("@")) {
            setMessage("Veuillez entrer une adresse email valide.");
            return;
        }

        const payload = { email }; // Ce qui sera envoyé
        console.log("Payload envoyé :", payload);

        try {
            const response = await fetch("/api/auth/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            console.log("Réponse de l'API :", result);

            if (response.ok) {
                setMessage("Un email a été envoyé à votre adresse.");
                setShowHomeButton(true); // Afficher le bouton pour rediriger
            } else {
                setMessage(result.error || "Une erreur est survenue.");
            }
        } catch (error) {
            console.error("Erreur lors de l'envoi :", error);
            setMessage("Une erreur est survenue.");
        }
    };

    const handleGoHome = () => {
        router.push("/");
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-indigo-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
            >
                <h2 className="text-center text-2xl font-bold mb-6">Forgot Password</h2>
                <p className="text-gray-600 text-sm mb-4">
                    Enter your email address to receive a password reset link.
                </p>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Email
                </label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                >
                    Send Reset Link
                </button>
                {message && <p className="text-center text-sm text-green-600 mt-4">{message}</p>}
            </form>

            {/* Bouton de redirection affiché uniquement si `response.ok` */}
            {showHomeButton && (
                <button
                    onClick={handleGoHome}
                    className="mt-4 bg-indigo-500 text-white font-bold py-2 px-4 rounded hover:bg-indigo-600 focus:outline-none focus:shadow-outline"
                >
                    Retour à l'accueil
                </button>
            )}
        </div>
    );
}