import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

export async function authCheck(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token) return { status: false, role: null };

  const decode = await jwtVerify(
    token,
    new TextEncoder().encode(process.env.TOKEN_SECRET)
  );
  return { status: true, isAdmin: decode.payload.isAdmin };
}
