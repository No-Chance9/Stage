import React, { useEffect, useState } from 'react';

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

    // Helper to determine the stock status
    const getStockStatus = (stock: number) => {
        if (stock === 0) return { status: "Out of Stock", class: "bg-red-200 text-red-800" };
        if (stock > 0 && stock <= 10) return { status: "Low Stock", class: "bg-yellow-200 text-yellow-800" };
        if (stock > 10 && stock <= 50) return { status: "In Stock", class: "bg-green-200 text-green-800" };
        if (stock > 50) return { status: "High Stock", class: "bg-blue-200 text-blue-800" };
        return { status: "Invalid Stock", class: "bg-gray-200 text-gray-800" };
    };

    // Update stock and status in the database and locally
    const updateStock = async (name: string, newStock: number) => {
        const stockStatus = getStockStatus(newStock);

        try {
            const response = await fetch("/api/bestSellings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    stock: newStock,
                    status: stockStatus.status,
                }),
            });

            if (!response.ok) {
                throw new Error("Failed to update stock");
            }

            const updatedProduct = await response.json();
            setValues((prevValues) =>
                prevValues.map((product) =>
                    product.name === updatedProduct.name
                        ? { ...product, stock: updatedProduct.stock, status: updatedProduct.status }
                        : product
                )
            );
        } catch (error) {
            console.error("Error updating stock:", error);
            alert("Failed to update stock. Please try again.");
        }
    };

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
                            <th className="text-left p-2">Stock</th>
                            <th className="text-left p-2">Sold</th>
                            <th className="text-left p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {values.map((product, index) => {
                            const stockInfo = getStockStatus(product.stock);
                            return (
                                <tr key={index}>
                                    <td className="p-2">{product.name}</td>
                                    <td className="p-2">{product.price}</td>
                                    <td className="p-2 flex items-center gap-2">
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded"
                                            onClick={() =>
                                                updateStock(product.name, Math.max(0, Number(product.stock) - 1))
                                            }
                                        >
                                            -
                                        </button>
                                        {product.stock}
                                        <button
                                            className="px-2 py-1 bg-gray-200 rounded"
                                            onClick={() =>
                                                updateStock(product.name, Number(product.stock) + 1)
                                            }
                                        >
                                            +
                                        </button>
                                    </td>
                                    <td className="p-2">{product.sold}</td>
                                    <td className={`p-2 ${stockInfo.class}`}>{stockInfo.status}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}