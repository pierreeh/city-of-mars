import Link from "next/link";

export default function Header() {
  return (
    <header>
      <Link href="/">City of Mars</Link>
      <Link href="/sign-in">Sign In</Link>
    </header>
  );
}
