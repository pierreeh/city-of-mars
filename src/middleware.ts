import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: any) {
  const secretKey = process.env.NEXTAUTH_SECRET;

  if (!secretKey) {
    return NextResponse.json(
      { message: "Blocked for Server Problems" },
      { status: 451 }
    );
  }

  const session = await getToken({ req, secret: secretKey });
  if (session?.role !== "ADMIN") {
    return NextResponse.rewrite(process.env.NEXTAUTH_URL, { status: 401 });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/dashboard/:path*"],
};
