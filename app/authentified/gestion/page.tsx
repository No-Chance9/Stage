'use client'
import React from "react";
import { useState } from "react";
import Attribution from "./user/page";
import UserManagementTable from "./modif/page";


export default function GestionUser() {
    const [showUserManagement, setShowUserManagement] = useState(true);
    const [selectedData, setSelectedData] = useState<{
        name: string,
        email: string,
        index: number,
    }>({
        name: '',
        email: '',
        index: 0,
    });

    const handleEmailSelection = (name: string, email: string, index:number) => {
        setSelectedData({name, email, index});
        localStorage.setItem("selectedData", JSON.stringify({ name, email, index }));
        setShowUserManagement(false);  // Switch to Attribution view when a name is selected
    };

    return (
        <>
            {showUserManagement ? (
                <UserManagementTable sendDataToParent=  {handleEmailSelection} />
            ) : (
                <Attribution />
            )}
        </>
    );
}