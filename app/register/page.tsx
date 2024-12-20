"use client";
import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { register } from "@/actions/register";

export default function Register() {
    const [error, setError] = useState<string>();
    const router = useRouter();
    const ref = useRef<HTMLFormElement>(null);

    const handleSubmit = async (formData: FormData) => {
        const result = await register({
            email: formData.get("email"),
            password: formData.get("password"),
            name: formData.get("name"),
            surname: formData.get("surname"),
        });

        if (result?.error) {
            setError(result.error); // Afficher le message d'erreur renvoyé par le backend
        } else {
            ref.current?.reset();
            return router.push("/login");
        }
    };

    return (
        <div className="flex flex-col max-w-7xl mx-auto h-screen relative">
            <section className="w-full h-1/2 bg-blue-800 flex items-center justify-center">
                <form
                    ref={ref}
                    action={handleSubmit}
                    className="p-6 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] flex flex-col justify-between items-center gap-2
                    border border-solid border-black bg-white rounded-lg"
                >
                    {error && <div className="text-red-600">{error}</div>}
                    <h1 className="flex justify-center mb-5 w-full text-2xl font-bold">Register</h1>
                    <div className="flex flex-col sm:flex-row flex-auto w-full gap-2">
                        <div className="flex flex-col flex-1">
                            <label className="text-sm">Name</label>
                            <input
                                type="text"
                                className="bg-slate-200 h-8 border border-solid border-black flex-1 py-1 px-2.5 rounded text-[13px]"
                                name="name"
                            />
                        </div>
                        <div className="flex flex-col flex-1">
                            <label className="text-sm">Surname</label>
                            <input
                                type="text"
                                className="bg-slate-200 h-8 border border-solid border-black flex-1 py-1 px-2.5 rounded text-[13px]"
                                name="surname"
                            />
                        </div>
                    </div>
                    <label className="w-full text-sm">Email</label>
                    <input
                        type="email"
                        className="w-full bg-slate-200 h-8 border border-solid border-black py-1 px-2.5 rounded"
                        name="email"
                    />
                    <label className="w-full text-sm">Password</label>
                    <div className="flex w-full">
                        <input
                            type="password"
                            className="w-full bg-slate-200 h-8 border border-solid border-black py-1 px-2.5 rounded"
                            name="password"
                        />
                    </div>
                    <button
                        className="w-full border border-solid border-black py-1.5 mt-2.5 rounded text-white bg-blue-800"
                    >
                        Sign up
                    </button>
                    <Link href="/login" className="text-sm text-[#888] transition duration-150 ease hover:text-black">
                        Already have an account?
                    </Link>
                </form>
            </section>
            <section className="bg-indigo-100 h-1/2"></section>
        </div>
    );
}