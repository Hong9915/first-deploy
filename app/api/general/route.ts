import { NextResponse } from "next/server";
import general from "../../../public/resume_general_info_service.json";

export async function GET() {
  return NextResponse.json(general);
}