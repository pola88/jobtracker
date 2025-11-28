import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { decodeAuthToken } from "@/lib/auth";
import { getAuthCookieName } from "@/lib/auth/cookie";

export default function Home() {
  const token = cookies().get(getAuthCookieName())?.value;
  const decoded = decodeAuthToken(token);

  if (decoded?.sub) {
    redirect("/dashboard");
  }

  redirect("/login");
}
