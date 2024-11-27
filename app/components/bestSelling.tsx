import React from 'react';
import 'chart.js/auto';
import { useEffect, useState } from "react";

export default function BestSelling({ sendDataToParent }: any) {
    const [values, setValues] = useState<any[]>([]);

    const fetchValues = async () => {
        try {
            const res = await fetch("/api/bestSellings");
            const data = await res.json();
            setValues(data);

            sendDataToParent(data);
        } catch (error) {
            console.error("Error fetching bestSelling:", error);
        }
    };

    useEffect(() => {
        fetchValues();
    }, []);

    return (
        <div className="bg-white shadow-md rounded-lg p-5">
            <div className="flex justify-between mb-4">
                <h3 className="text-xl font-semibold">Best Selling Products</h3>
                <a href="#" className="text-blue-600">View all</a>
            </div>
            <div>
                <table className="min-w-full">
                    <thead>
                        <tr>
                            <th className="text-left p-2">Product Name</th>
                            <th className="text-left p-2">Price</th>
                            <th className="text-left p-2">Sold</th>
                            <th className="text-left p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {values.map((product, index) => (
                            <tr key={index}>
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.price}</td>
                                <td className="p-2">{product.sold}</td>
                                <td className={`p-2 ${product.statusColor}`}>{product.status}</td>
                                {/* <td className='p-2 text-green-600'>{product.status}</td> */}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};