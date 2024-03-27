import { db } from "@/lib/db";
import FormEdit from "./FormEdit";

export default async function JournalCategoryEdit({
  params,
}: {
  params: { id: string };
}) {
  const journalCategory = await db.journalCategories.findUnique({
    where: { id: params.id },
    select: {
      id: true,
      name: true,
      description: true,
      published: true,
    },
  });

  return (
    <section>
      <h1>Edit category {journalCategory.name}</h1>
      <FormEdit
        id={params.id}
        name={journalCategory.name}
        description={journalCategory.description}
        published={journalCategory.published}
      />
    </section>
  );
}
