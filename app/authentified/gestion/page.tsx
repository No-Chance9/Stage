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
    }>({
        name: '',
        email: '',
    });

    const handleEmailSelection = (name: string, email: string) => {
        setSelectedData({name, email});
        localStorage.setItem("selectedData", JSON.stringify({ name, email }));
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