'use client';
import { FormSubmitProvider } from '@/app/components/FormSubmitContext';
import "../globals.css";
import { SidebarUse } from "../components/sidebarUse";
import Header from "../components/header";

export default function AuthentifiedLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <FormSubmitProvider>
            <SidebarUse>
                <Header />
                {children}
            </SidebarUse>
        </FormSubmitProvider>
    );
}