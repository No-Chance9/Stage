"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
    IconArrowLeft,
    IconBrandTabler,
    IconSettings,
    IconUserBolt,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Header from "./header";
import Totaux from "./totaux";
import '../style/styles.css'
import { CustomerGrowthChart } from "./customerGrowth";
import { YearlyVisitorsChart } from "./yearlyVisitors";
import ButtonGroup from "./buttonGroup";
import ButtonDl from "./buttonDownload";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";
import { ReactNode } from "react";


export const SidebarUse = ({children}: { children: ReactNode }) => {
    const links = [
        {
            label: "Tableaux de bord",
            href: "/authentified/dashboard",
            icon: (
                <IconBrandTabler className="text-icon  dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Gestion des utilisateurs",
            href: "/authentified/gestion",
            icon: (
                <IconUserBolt className="text-icon hover:text-sky-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Support",
            href: "/authentified/support",
            icon: (
                <IconArrowLeft className="text-icon hover:text-sky-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Setting",
            href: "#",
            icon: (
                <IconSettings className="text-icon hover:text-sky-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
    ];
    const [open, setOpen] = useState(false);
    return (
        <div
            className={cn(
                "rounded-md flex flex-col md:flex-row bg-gray-100 dark:bg-white w-full flex-1 max-w-7xl mx-auto border border-neutral-200 dark:border-neutral-700  ",
                "h-full" // for your use case, use `h-screen` instead of `h-[60vh]`
            )}
        >
            <Sidebar open={open} setOpen={setOpen} animate={false}>
                <SidebarBody className="justify-between gap-10 ">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden p-5">
                        {open ? <Logo /> : <LogoIcon />}
                        <div className="mt-8 flex flex-col gap-2">
                            {links.map((link, idx) => (
                                <SidebarLink key={idx} link={link} />
                            ))}
                        </div>
                    </div>
                    {/* <div>
                        <SidebarLink
                            link={{
                                label: "Manu Arora",
                                href: "#",
                                icon: (
                                    <Image
                                        src="https://assets.aceternity.com/manu.png"
                                        className="h-7 w-7 flex-shrink-0 rounded-full"
                                        width={50}
                                        height={50}
                                        alt="Avatar"
                                    />
                                ),
                            }}
                        />
                    </div> */}
                </SidebarBody>
            </Sidebar>
            <main className="w-max flex-1">
                {children}
            </main>
            {/* <Dashboard /> */}
        </div>
    );
}
export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre flex"
            >
                <Image src='/images/ziema.svg' alt='' width={194} height={39}/>
                <Image src='/images/dark:light.svg' alt='' width={32} height={32}/>
            </motion.span>
        </Link>
    );
};
export const LogoIcon = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
        </Link>
    );
};

