import { db } from "@/lib/db";
import FormCreate from "./FormCreate";

export default async function CreateArticle() {
  const journalCategories = await db.journalCategories.findMany({
    where: {
      published: true,
    },
    select: {
      id: true,
      name: true,
    },
  });

  return (
    <section>
      <h1>Create Article</h1>
      <FormCreate journalCategories={journalCategories} />
    </section>
  );
}
