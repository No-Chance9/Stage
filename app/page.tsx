"use client";
import { Dashboard } from "./components/dashboard";
import React from 'react';
// import Three from "./components/yearlyVisitors";
import Totaux from "./components/totaux";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getToken } from 'next-auth/jwt';


export default function Home() {
  const { status } = useSession();
  const router = useRouter();

  const showSession = () => {
    if (status === "authenticated") {
      console.log('etat use session:', useSession());
      router.push("/authentified/user/dashboard")
      return (
        <>
          <button
            className="border border-solid border-black rounded"
            onClick={() => {
              signOut({ redirect: false }).then(() => {
                router.push("/");
              });
            }}
          >
            Sign Out
          </button>
          {/* <Dashboard /> */}
        </>
      )
    } else if (status === "loading") {
      console.log('etat use session:', useSession().status);

      return (
        <span className="text-[#888] text-sm mt-7">Loading...</span>
      )
    } else {
      console.log('etat use session:', useSession().status);
      return (
        <Link
          href="/login"
          className="flex justify-center border border-solid w-1/3 text-white bg-indigo-700 border-black rounded-lg"
        >
          <p className="m-2">Sign In</p>
        </Link>
      )
    }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-center">
      <h1 className="text-xl">Home</h1>
      {showSession()}
      {/* <Dashboard/> */}
    </main>
  );
}
