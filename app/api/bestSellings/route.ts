import { connectDB } from "@/lib/mongodb";
import Best from "@/models/BestSelling";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET(){
    await connectDB();
    
    try{
        const values = await Best.find({});
    
        return NextResponse.json(values);

    }catch(err:any){
        return NextResponse.json({error: err.message});
    }
}