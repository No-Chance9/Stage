import React from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

const ButtonDl = () => {
    return (
        <div className="\ rounded-lg border border-gray-300 overflow-hidden bg-blue-100 divide-x divide-gray-300">
            <button className="flex gap-2 w-1/3 p-2 text-center text-black font-semibold bg-blue-100 focus:outline-none focus:bg-gray-100">
                <DocumentArrowDownIcon className=" h-5 w-5 flex-shrink-0" />
                Download
            </button>
        </div>
    );
};

export default ButtonDl;