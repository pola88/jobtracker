import { NextResponse } from "next/server";

import { clearAuthToken } from "@/lib/auth";

export async function POST() {
  const response = NextResponse.json({ message: "Sesión cerrada" });
  clearAuthToken(response.cookies);
  return response;
}

