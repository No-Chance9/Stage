import { connectDB } from "@/lib/mongodb";
import Overview from "@/models/Overview";
import { NextResponse } from "next/server";

export default async function GET(){
    await connectDB();
    
    const values = await Overview.find({});

    NextResponse.json(values);
}