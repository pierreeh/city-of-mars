import Link from "next/link";

export default function Sidebar() {
  return (
    <nav>
      <ul>
        <li>
          <p>Journal</p>
          <ul>
            <li>
              <Link href="/dashboard/journal/categories">Categories</Link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  );
}
