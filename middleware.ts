// middleware.ts
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const BASIC_AUTH = process.env.BASIC_AUTH || "user:password";

  const authHeader = req.headers.get("authorization");

  if (authHeader) {
    const [, encoded] = authHeader.split(" ");
    const decoded = Buffer.from(encoded, "base64").toString();
    if (decoded === BASIC_AUTH) {
      return NextResponse.next();
    }
  }

  return new NextResponse("Authentication required", {
    status: 401,
    headers: {
      "WWW-Authenticate": 'Basic realm="Secure Area"',
    },
  });
}

export const config = {
  matcher: ["/"],
};
