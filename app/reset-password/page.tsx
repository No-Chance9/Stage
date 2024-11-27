// app/reset-password/page.tsx
"use client";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function ResetPassword() {
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setMessage("Passwords do not match.");
            return;
        }

        const response = await fetch("/api/auth/reset-password", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, password }),
        });

        const result = await response.json();
        if (response.ok) {
            setMessage("Your password has been reset successfully!");
        } else {
            setMessage(result.error || "Something went wrong.");
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-indigo-50">
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-96"
            >
                <h2 className="text-center text-2xl font-bold mb-6">Reset Password</h2>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    New Password
                </label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Confirm Password
                </label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white font-bold py-2 px-4 mt-4 rounded hover:bg-blue-600 focus:outline-none focus:shadow-outline"
                >
                    Reset Password
                </button>
                {message && <p className="text-center text-sm text-green-600 mt-4">{message}</p>}
            </form>
        </div>
    );
}