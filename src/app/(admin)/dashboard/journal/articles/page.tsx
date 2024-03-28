import Link from "next/link";

import { db } from "@/lib/db";

export default async function JournalArticles() {
  const journalArticles = await db.journalArticles.findMany({
    select: {
      id: true,
      name: true,
      published: true,
    },
  });

  return (
    <section>
      <h1>Articles</h1>
      <Link href="/dashboard/journal/articles/create">Create</Link>

      <ul>
        {journalArticles.map((j: any) => (
          <li key={j.id}>
            {j.name}
            <span>{j.published ? "eye_opened" : "eye_closed"}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}
