import React, { useEffect, useState } from "react";
import { MinusCircleIcon, PlusCircleIcon, TrashIcon } from "@heroicons/react/24/outline";

export default function BestSelling({ sendDataToParent, sendProductToparent }: any) {
    const [values, setValues] = useState<
        Array<{
            name: string;
            price: number;
            sold: number;
            stock: number;
            status?: string; // Optionnel, sera calculé dynamiquement
        }>
    >([]);

    const [isFormOpen, setIsFormOpen] = useState(false); // Contrôle de la visibilité du formulaire
    const [newProduct, setNewProduct] = useState<{
        name: string;
        price: number | "";
        sold: number | "";
        stock: number | "";
    }>({
        name: "",
        price: "",
        sold: "",
        stock: "",
    });

    const [error, setError] = useState<string | null>(null); // Gestion des erreurs

    // Récupération des données de la base de données
    const fetchValues = async () => {
        try {
            const res = await fetch("/api/bestSellings");
            if (!res.ok) throw new Error("Failed to fetch best-selling products.");
            const data = await res.json();
            setValues(data);
            sendDataToParent(data);
        } catch (error) {
            console.error("Error fetching best-selling products:", error);
        }
    };

    useEffect(() => {
        fetchValues();
    }, []);

    // Calcul du statut et de la classe CSS pour le stock
    const getStockStatus = (stock: number) => {
        if (stock === 0) return { status: "Out of Stock", class: "bg-red-200 text-red-800" };
        if (stock > 0 && stock <= 10) return { status: "Low Stock", class: "bg-yellow-200 text-yellow-800" };
        if (stock > 10 && stock <= 50) return { status: "In Stock", class: "bg-green-200 text-green-800" };
        return { status: "High Stock", class: "bg-blue-200 text-blue-800" };
    };

    // Mise à jour du stock
    const updateStock = async (name: string, newStock: number) => {
        const stockInfo = getStockStatus(newStock);

        try {
            const response = await fetch("/api/bestSellings", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name,
                    stock: newStock,
                    status: stockInfo.status,
                }),
            });

            if (!response.ok) throw new Error("Failed to update stock.");

            const updatedProduct = await response.json();

            // Mise à jour locale
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

    // Suppression d'un produit
    const handleDelete = async (name: string) => {
        try {
            const response = await fetch("/api/bestSellings", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name }),
            });

            if (!response.ok) throw new Error("Failed to delete product.");

            // Mise à jour locale
            setValues((prevValues) => prevValues.filter((product) => product.name !== name));

            sendProductToparent(newProduct);
        } catch (error) {
            console.error("Error deleting product:", error);
            alert("Failed to delete product. Please try again.");
        }
    };

    // Ajout d'un nouveau produit
    const handleAddData = async () => {
        if (!newProduct.name.trim() || !newProduct.price || !newProduct.sold || !newProduct.stock) {
            setError("All fields are required and must be valid.");
            return;
        }

        setError(null); // Clear errors

        try {
            const response = await fetch("/api/bestSellings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: newProduct.name,
                    price: Number(newProduct.price),
                    sold: Number(newProduct.sold),
                    stock: Number(newProduct.stock),
                }),
            });

            if (!response.ok) throw new Error("Failed to add new product.");

            const result = await response.json();

            // Mise à jour locale
            setValues((prevValues) => [...prevValues, result]);

            sendProductToparent(newProduct);

            // Réinitialisation du formulaire
            setNewProduct({ name: "", price: "", sold: "", stock: "" });
            setIsFormOpen(false); // Fermeture du formulaire
        } catch (error: any) {
            console.error("Error adding new product:", error);
            setError(error.message);
        }
    };

    return (
        <div className="bg-white shadow-md rounded-lg p-5">
            <div className="flex justify-between mb-4">
                <h3 className="text-xl font-semibold">Best Selling Products</h3>
                <div
                    className="flex items-center mb-4 w-fit cursor-pointer"
                    onClick={() => setIsFormOpen(!isFormOpen)}
                >
                    <PlusCircleIcon className="h-5 w-5 text-gray-400 mr-2 hover:text-blue-400" />
                    <span className="hover:underline">Add New Product</span>
                </div>
            </div>

            {isFormOpen && (
                <div className="bg-gray-100 p-4 rounded shadow">
                    {error && <p className="text-red-500 mb-2">{error}</p>}
                    <input
                        type="text"
                        placeholder="Name"
                        value={newProduct.name}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, name: e.target.value }))}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Price"
                        value={newProduct.price}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, price: Number(e.target.value) }))}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Sold"
                        value={newProduct.sold}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, sold: Number(e.target.value) }))}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <input
                        type="number"
                        placeholder="Stock"
                        value={newProduct.stock}
                        onChange={(e) => setNewProduct((prev) => ({ ...prev, stock: Number(e.target.value) }))}
                        className="w-full mb-2 p-2 border rounded"
                    />
                    <button
                        onClick={handleAddData}
                        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700"
                    >
                        Add Product
                    </button>
                </div>
            )}

            <table className="min-w-full mt-4">
                <thead>
                    <tr>
                        <th className="text-left p-2">Product Name</th>
                        <th className="text-left p-2">Price</th>
                        <th className="text-left p-2">Stock</th>
                        <th className="text-left p-2">Sold</th>
                        <th className="text-left p-2">Status</th>
                        <th className="text-left p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {values.map((product, index) => {
                        const stockInfo = getStockStatus(product.stock);
                        return (
                            <tr key={index} className="border-t">
                                <td className="p-2">{product.name}</td>
                                <td className="p-2">{product.price}$</td>
                                <td className="p-2 flex gap-2 items-center">
                                    <button
                                        className="bg-gray-200 p-1 rounded"
                                        onClick={() => updateStock(product.name, Math.max(0, product.stock - 1))}
                                    >
                                        -
                                    </button>
                                    {product.stock}
                                    <button
                                        className="bg-gray-200 p-1 rounded"
                                        onClick={() => updateStock(product.name, product.stock + 1)}
                                    >
                                        +
                                    </button>
                                </td>
                                <td className="p-2">{product.sold} pcs</td>
                                <td className={`p-2 ${stockInfo.class}`}>{stockInfo.status}</td>
                                <td className="p-2">
                                    <TrashIcon
                                        className="h-5 w-5 text-red-500 cursor-pointer hover:text-red-700"
                                        onClick={() => handleDelete(product.name)}
                                    />
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}