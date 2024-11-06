'use client'
import React from "react";
import { Dashboard } from "@/app/components/dashboard";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";



export default function Tableaux() {

    const router = useRouter();

    return (
        <>
            <div className="flex justify-center">
                <button
                    className=" border mt-2 border-solid border-black rounded"
                    onClick={() => {
                        signOut({ redirect: false }).then(() => {
                            router.push("/");
                        });
                    }}
                >
                    Sign Out
                </button>
            </div>
            <Dashboard />
        </>
    );
}