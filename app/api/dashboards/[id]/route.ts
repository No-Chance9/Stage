import { connectDB } from "@/lib/mongodb";
import Dashboard from "@/models/Dashboard";
import { NextResponse, NextRequest } from "next/server";

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();

    const { id } = params; // ID du dashboard

    try {
        const dashboard = await Dashboard.findById(id);
        if (!dashboard) {
            return NextResponse.json({ error: "Dashboard not found" }, { status: 404 });
        }

        return NextResponse.json(dashboard);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    await connectDB();

    const { id } = params; // ID du dashboard
    const { type, data } = await request.json(); // Type: bestSelling, yearlyVisitors, etc.

    try {
        // Validate type
        if (!["bestSelling", "yearlyVisitors"].includes(type)) {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        // Load the dashboard
        const dashboard = await Dashboard.findById(id);
        if (!dashboard) {
            return NextResponse.json({ error: "Dashboard not found" }, { status: 404 });
        }

        // Handle yearlyVisitors
        if (type === "yearlyVisitors") {
            if (!data.label || data.label.trim() === "") {
                return NextResponse.json(
                    { error: "Label cannot be empty." },
                    { status: 400 }
                );
            }
            if (typeof data.value !== "number" || data.value < 0) {
                return NextResponse.json(
                    { error: "Visitors count must be a non-negative number." },
                    { status: 400 }
                );
            }
            const existingVisitor = dashboard.yearlyVisitors.find((item: any) => item.label.toLowerCase() === data.label.toLowerCase());
            if (existingVisitor) {
                return NextResponse.json({ error: "Label already exists" }, { status: 400 });
            }
            dashboard.yearlyVisitors.push(data);
        }

        // Handle bestSelling
        if (type === "bestSelling") {
            if (!data.name || data.name.trim() === "") {
                return NextResponse.json(
                    { error: "Name cannot be empty." },
                    { status: 400 }
                );
            }
            if (typeof data.price !== "number" || data.price < 0 ) {
                return NextResponse.json(
                    { error: "Price must be a non-negative number." },
                    { status: 400 }
                );
            }
            if (typeof data.stock !== "number" || data.stock < 0) {
                return NextResponse.json(
                    { error: "Stock must be a non-negative number." },
                    { status: 400 }
                );
            }
            if (typeof data.sold !== "number" || data.sold < 0) {
                return NextResponse.json(
                    { error: "Sold count must be a non-negative number." },
                    { status: 400 }
                );
            }
            const existingProduct = dashboard.bestSelling.find((item: any) => item.name === data.name);
            if (existingProduct) {
                return NextResponse.json({ error: "Product name already exists" }, { status: 400 });
            }
            dashboard.bestSelling.push(data);
        }

        // Save the updated dashboard
        await dashboard.save();

        return NextResponse.json(dashboard, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;
    const { type, index, name, ...fieldsToUpdate } = await request.json();

    try {
        if (!["bestSelling", "yearlyVisitors"].includes(type)) {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        const dashboard = await Dashboard.findById(id);

        if (!dashboard) {
            return NextResponse.json({ error: "Dashboard not found" }, { status: 404 });
        }

        const targetArray = dashboard[type];
        
        if (!Array.isArray(targetArray)) {
            return NextResponse.json({ error: "Invalid type or structure" }, { status: 400 });
        }

        // Mise à jour par index
        if (typeof index === "number") {
            if (index < 0 || index >= targetArray.length) {
                return NextResponse.json({ error: "Invalid index" }, { status: 400 });
            }
            Object.assign(targetArray[index], fieldsToUpdate);
        }

        // Mise à jour par nom
        else if (name) {
            const item = targetArray.find((item: any) => item.name === name);
            if (!item) {
                return NextResponse.json({ error: "Item not found" }, { status: 404 });
            }
            Object.assign(item, fieldsToUpdate);
        } else {
            return NextResponse.json({ error: "Neither index nor name provided" }, { status: 400 });
        }

        await dashboard.save();

        return NextResponse.json(dashboard, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params; // ID du dashboard
    const { type, index, name } = await request.json();

    try {
        if (!["bestSelling", "yearlyVisitors"].includes(type)) {
            return NextResponse.json({ error: "Invalid type" }, { status: 400 });
        }

        const dashboard = await Dashboard.findById(id);

        if (!dashboard) {
            return NextResponse.json({ error: "Dashboard not found" }, { status: 404 });
        }

        const targetArray = dashboard[type];
        if (!Array.isArray(targetArray)) {
            return NextResponse.json({ error: "Invalid type or structure" }, { status: 400 });
        }

        // Supprimer en fonction de l'index si fourni
        if (typeof index === "number") {
            if (index < 0 || index >= targetArray.length) {
                return NextResponse.json({ error: "Invalid index" }, { status: 400 });
            }
            targetArray.splice(index, 1);
        }

        // Supprimer en fonction du nom si fourni
        else if (name) {
            const itemIndex = targetArray.findIndex((item: any) => item.label === name);
            if (itemIndex === -1) {
                return NextResponse.json({ error: "Item not found" }, { status: 404 });
            }
            targetArray.splice(itemIndex, 1);
        } else {
            return NextResponse.json({ error: "Neither index nor name provided" }, { status: 400 });
        }

        // Sauvegarder le document mis à jour
        await dashboard.save();

        return NextResponse.json(dashboard, { status: 200 });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}