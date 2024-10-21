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
import Overview from "./overview";
import '../style/styles.css'
import { CustomerGrowthChart } from "./customerGrowth";
import { YearlyVisitorsChart } from "./yearlyVisitors";
import { BestSellingProducts } from "./bestSelling";
import ButtonGroup from "./buttonGroup";
import ButtonDl from "./buttonDownload";
import { DocumentArrowDownIcon } from "@heroicons/react/24/outline";


export const SidebarUse = () => {
    const links = [
        {
            label: "Tableaux de bord",
            href: "#",
            icon: (
                <IconBrandTabler className="text-icon  dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Gestion des utilisateurs",
            href: "#",
            icon: (
                <IconUserBolt className="text-icon hover:text-sky-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
            ),
        },
        {
            label: "Support",
            href: "#",
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
                "h-[130vh]" // for your use case, use `h-screen` instead of `h-[60vh]`
            )}
        >
            <Sidebar open={open} setOpen={setOpen} animate={false}>
                <SidebarBody className="justify-between gap-10 ">
                    <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
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
            <Dashboard />
        </div>
    );
}
export const Logo = () => {
    return (
        <Link
            href="#"
            className="font-normal flex space-x-2 items-center text-sm text-black py-1 relative z-20"
        >
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
            <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="font-medium text-black dark:text-white whitespace-pre"
            >
                Acet Labs
                <div className="carre"></div>
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
            <div className="h-5 w-6 bg-black dark:bg-white rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
        </Link>
    );
};

// Dummy dashboard component with content
export const Dashboard = () => {
    return (

        <div className="flex flex-wrap h-screen w-max ">
            <div className="w-full">
                <Header />
            </div>
            <div className="grid grid-cols-7  w-full ">
                <h1 className="font-bold p-4 ">Overview</h1>
                <div className="w-60 justify-self-end col-start-6  p-4 col-end-7">
                    <ButtonGroup />
                </div>
                {/* <div className=" justify-self-start col-start-7 p-4 col-end-8 ">
                    <ButtonDl />
                </div> */}
                <div className=" justify-self-start col-start-7 p-4 col-end-8 ">
                    
                </div>
            </div>
            {/* overview */}
            <div className="rounded-tl-2xl dark:border-neutral-700 bg-gray dark:bg-neutral-900 flex flex-col gap-2 w-full h-fit">
                <div className="flex gap-2 w-max flex-1 p-4">
                    {/* {[...new Array(4)].map((i) => ( */}
                        <div
                            key={"first-array"}
                            className="h-max w-max rounded-lg bg-gray-100 dark:bg-neutral-800 "
                        ><Overview /></div>
                    {/* ))} */}
                </div>
                <div className="grid grid-col-3 grid-row-2 w-full gap-6 p-4 flex-1 overflow-hidden">
                    {/* {[...new Array(2)].map((i) => ( */}
                    <div
                        key={"second-array"}
                        className=" rounded-lg col-start-1 col-end-3  bg-gray-100 dark:bg-neutral-800 "
                    ><CustomerGrowthChart />
                    </div>
                    <div
                        key={"second-array"}
                        className=" rounded-lg col-start-3 col-end-4  bg-gray-100 dark:bg-neutral-800 flex-1 "
                    ><YearlyVisitorsChart />
                    </div>
                    <div
                        key={"second-array"}
                        className=" rounded-lg row-start-2 col-start-1 col-end-4 bg-gray-100 dark:bg-neutral-800 flex-1 "
                    ><BestSellingProducts />
                    </div>
                    {/* ))} */}
                </div>
            </div>
            {/* fin overview */}
        </div>

    );
};
