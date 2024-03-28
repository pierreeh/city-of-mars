import Link from "next/link";

import { db } from "@/lib/db";
import FormCreate from "./FormCreate";

type JournalCategories = {
  id: string;
  name: string;
  published: boolean;
};

export default async function JournalCategories() {
  const journalCategories = await db.journalCategories.findMany({
    orderBy: {
      createdAt: "asc",
    },
    select: {
      id: true,
      name: true,
      published: true,
    },
  });

  return (
    <section>
      <h1>{journalCategories.length} Journal Categories</h1>

      <ul>
        {journalCategories.map((j: JournalCategories) => (
          <li key={j.id}>
            <Link href={`/dashboard/journal/categories/${j.id}`}>{j.name}</Link>
            <span>{j.published ? "eye_opened" : "eye_closed"}</span>
          </li>
        ))}
      </ul>

      <aside>
        <h1>New category</h1>
        <FormCreate />
      </aside>
    </section>
  );
}
