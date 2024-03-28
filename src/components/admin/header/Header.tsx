import Link from "next/link";

import { SignOutButton } from "@/components/client/commons/auth/AuthButtons";

export default function Header() {
  return (
    <header>
      <Link href="/">City of Mars</Link>
      <Link href="/dashboard">Dashboard</Link>
      <SignOutButton />
    </header>
  );
}
