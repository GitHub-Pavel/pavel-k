import { SOCIAL_LIST } from "@constants";
import { NextResponse } from "next/server";

export async function GET() {
    return NextResponse.json(SOCIAL_LIST);
}