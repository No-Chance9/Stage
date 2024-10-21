import React from 'react';
import 'chart.js/auto';

// Module 1: Best Selling Products
export const BestSellingProducts = () => {
    const products = [
        { name: 'Revenue', price: '$400', sold: '0 pcs', status: 'Out of Stock', statusColor: 'text-red-600' },
        { name: 'Revenue', price: '$185', sold: '12 pcs', status: 'In Stock', statusColor: 'text-green-600' },
        { name: 'Revenue', price: '$150', sold: '36 pcs', status: 'Low quantity', statusColor: 'text-yellow-600' },
        { name: 'Revenue', price: '$132', sold: '19 pcs', status: 'Low quantity', statusColor: 'text-yellow-600' },
    ];

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
                        {products.map((product, index) => (
                            <tr key={index}>
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.price}</td>
                                <td className="p-2">{product.sold}</td>
                                <td className={`p-2 list-disc ${product.statusColor}`}>{product.status}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};