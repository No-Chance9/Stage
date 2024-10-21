// import React from 'react';

// const ButtonGroup = () => {
//     return (
//         <div className="flex rounded-lg border border-gray-300 overflow-hidden divide-x divide-gray-300 text-center active:bg-blue-600">
//             <button className="w-1/3 py-2 text-center text-black font-semibold hover:bg-gray-100 focus:outline-none focus:bg-gray-100 selected">
//                 Years
//             </button>
//             <button className="w-1/3 py-2 text-center text-black font-semibold hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
//                 Months
//             </button>
//             <button className="w-1/3 py-2 text-center text-black font-semibold hover:bg-gray-100 focus:outline-none focus:bg-gray-100">
//                 Days
//             </button>
//         </div>
//     );
// };

// export default ButtonGroup;

import React, { useState } from 'react';

const ButtonGroup = () => {
    const [selectedTab, setSelectedTab] = useState('Years');

    return (
        <div className="flex rounded-lg border border-gray-300 overflow-hidden divide-x divide-gray-300">
            <button
                className={`w-1/3 py-2 text-center text-black font-semibold hover:bg-white focus:outline-none focus:bg-gray-100 ${selectedTab === 'Years' ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedTab('Years')}
            >
                Years
            </button>
            <button
                className={`w-1/3 py-2 text-center text-black font-semibold hover:bg-white focus:outline-none focus:bg-gray-100 ${selectedTab === 'Months' ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedTab('Months')}
            >
                Months
            </button>
            <button
                className={`w-1/3 py-2 text-center text-black font-semibold hover:bg-white focus:outline-none focus:bg-gray-100 ${selectedTab === 'Days' ? 'bg-blue-100' : ''}`}
                onClick={() => setSelectedTab('Days')}
            >
                Days
            </button>
        </div>
    );
};

export default ButtonGroup;
