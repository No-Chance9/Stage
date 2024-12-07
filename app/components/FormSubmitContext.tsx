import React, { createContext, useContext, useState, ReactNode } from 'react';

type FormSubmitContextType = {
    formSubmitFromChildren: string[];
    setformSubmitFromChildren: (value: string) => void;
};

const FormSubmitContext = createContext<FormSubmitContextType | null>(null);

export const FormSubmitProvider = ({ children }: { children: ReactNode }) => {
    const [formSubmitFromChildren, setformSubmitFromChildrenState] = useState<string[]>([]);

    const setformSubmitFromChildren = (value: string) => {
        // Update state to append the new value to the array
        setformSubmitFromChildrenState((prev) => [...prev, value]);
    };

    return (
        <FormSubmitContext.Provider value={{ formSubmitFromChildren, setformSubmitFromChildren }}>
            {children}
        </FormSubmitContext.Provider>
    );
};

export const useFormSubmitContext = () => {
    const context = useContext(FormSubmitContext);
    if (!context) {
        throw new Error('useFormSubmitContext must be used within a FormSubmitProvider');
    }
    return context;
};