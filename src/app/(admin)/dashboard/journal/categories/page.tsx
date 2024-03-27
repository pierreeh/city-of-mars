import { db } from "@/lib/db";
import FormCreate from "./FormCreate";

type JournalCategories = {
  id: string;
  name: string;
  published: boolean;
};

export default async function JournalCategories() {
  const journalCategories = await db.journalCategories.findMany({
    select: {
      id: true,
      name: true,
      published: true,
    },
  });

  return (
    <section>
      <h1>Journal Categories</h1>

      <ul>
        {journalCategories.map((j: JournalCategories) => (
          <li key={j.id}>{j.name}</li>
        ))}
      </ul>

      <aside>
        <h1>New category</h1>
        <FormCreate />
      </aside>
    </section>
  );
}
