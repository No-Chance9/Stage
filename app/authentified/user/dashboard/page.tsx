'use client';
import React from "react";
import { Dashboard } from "@/app/components/dashboard";
import { useFormSubmitContext } from "@/app/components/FormSubmitContext";

export default function Tableaux() {
    const { setformSubmitFromChildren } = useFormSubmitContext();

    return <Dashboard setformSubmitFromChildren={setformSubmitFromChildren} />;
}