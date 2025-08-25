import { NextRequest, NextResponse } from "next/server";

export async function POST(req: Request) {
    try{
        const t=await req.json();
        return NextResponse.json({message: t},{status: 200})
    }catch(err){
        return NextResponse.json({message: "received"},{status: 400})

    }

}