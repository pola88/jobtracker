import { NextResponse } from "next/server";

import { clearAuthToken } from "@/lib/auth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST() {
  const response = NextResponse.json({ message: "Sesión cerrada" });
  clearAuthToken(response.cookies);
  return response;
}

