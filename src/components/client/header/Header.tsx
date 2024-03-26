import Link from "next/link";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { SignOutButton } from "../commons/auth/AuthButtons";

export default async function Header() {
  const session = await getServerSession(authOptions);

  return (
    <header>
      <Link href="/">City of Mars</Link>
      {session ? <SignOutButton /> : <Link href="/sign-in">Sign In</Link>}
    </header>
  );
}
