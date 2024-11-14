'use client'
import { Disclosure, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, Cog6ToothIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';
import { useSession } from "next-auth/react";
import Image from 'next/image';


const navigation = [
    { name: 'Dashboard', href: '#', current: true },
    { name: 'Team', href: '#', current: false },
    { name: 'Projects', href: '#', current: false },
    { name: 'Calendar', href: '#', current: false },
];

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ');
}


export default function Header() {
    const [photoProfil, setPhotoProfil] = useState<string>('/images/Union.svg');

    const { data: session } = useSession();

    const user = session?.user;

    console.log("full data", user);

    useEffect(() => {
        const fetchValues = async () => {
            if (user) {
                const imageRes = await fetch(`/api/profilePicture/${user.profilePicture}`);
                const imageData = await imageRes.json();
                console.log("imageData.path:", imageData.path);

                setPhotoProfil(imageData.path);
            }
        };

        fetchValues();
    }, [user]);


    return (
        <Disclosure as="nav" className="bg-white border border-transparent border-l-slate-50  ">
            <div className="mx-auto  px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">

                    <div className="relative flex items-center w-full max-w-xs">
                        <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                        </span>
                        <input
                            type="text"
                            placeholder="Search or type a command"
                            className="block w-full pl-10 pr-3 py-2 rounded-full bg-gray-100 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white"
                        />
                    </div>

                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Settings and Notifications */}
                        <button
                            type="button"
                            className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <Cog6ToothIcon aria-hidden="true" className="h-6 w-6" />
                        </button>
                        <button
                            type="button"
                            className="relative rounded-full p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="h-6 w-6" />
                        </button>

                        {/* Profile dropdown */}
                        <Menu as="div" className="relative ml-3">
                            <div>
                                <MenuButton className="relative flex rounded-full bg-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2">
                                    <span className="sr-only">Open user menu</span>
                                    <Image
                                        alt=""
                                        src={photoProfil}
                                        width={30} height={30}
                                        className="h-8 w-8 rounded-full"
                                    />
                                </MenuButton>
                            </div>
                            <MenuItems
                                transition
                                className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5"
                            >
                                <MenuItem>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">Your Profile</a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">Settings</a>
                                </MenuItem>
                                <MenuItem>
                                    <a href="#" className="block px-4 py-2 text-sm text-gray-700">Sign out</a>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
                    </div>
                </div>
            </div>
        </Disclosure>
    );
}