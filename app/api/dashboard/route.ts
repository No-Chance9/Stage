import { connectDB } from "@/lib/mongodb";
import Dashboard from "@/models/Dashboard";
import { NextResponse, NextRequest } from "next/server";

export async function POST(request: NextRequest) {
    await connectDB();
    const { userId } = await request.json();

    // Create a new dashboard linked to the user
    const newDashboard = new Dashboard({
        userId,
        data: {
            customerGrowthData: [],
            yearlyVisitors: [],
            bestSelling: [],
            totaux: [],
        },
    });

    try {
        const savedDashboard = await newDashboard.save();
        return NextResponse.json(savedDashboard);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}

export async function GET(request: NextRequest) {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    try {
        const dashboard = await Dashboard.findOne({ userId });
        if (!dashboard) return NextResponse.json({ error: "Dashboard not found" }, { status: 404 });

        return NextResponse.json(dashboard);
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}