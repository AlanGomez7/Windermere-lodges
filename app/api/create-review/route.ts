import { NextRequest, NextResponse } from "next/server";

export default async function GET(req: NextRequest) {
    console.log(req.body);

    NextResponse.json({message: "received"},{status: 200})
}