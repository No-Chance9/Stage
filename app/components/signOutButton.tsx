'use client'
import React from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function SignOutButton() {

    const router = useRouter();

    return (
    <button
        className=" border mt-2 border-solid w-30 text-white bg-blue-800 border-black rounded-lg p-1"
        onClick={() => {
            signOut({ redirect: false }).then(() => {
                router.push("/");
            });
        }}
    >
        Sign Out
    </button>
    );
}