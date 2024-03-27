"use client";

import { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { JournalCategoriesSchema } from "@/schemas/journal/JournalCategoriesSchema";

type JournalCategory = {
  id: string;
  name: string;
  description: string;
  published: boolean;
};

type JournalCategoryEdit = z.infer<typeof JournalCategoriesSchema>;

export default function FormEdit({
  id,
  name,
  description,
  published,
}: JournalCategory) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JournalCategoryEdit>({
    resolver: zodResolver(JournalCategoriesSchema),
    defaultValues: { name, description, published },
  });
  const router = useRouter();
  const [hasErrors, setErrors] = useState();

  async function onSubmit(data: JournalCategoryEdit) {
    try {
      const body = JSON.stringify({
        name: data.name,
        description: data.description,
        published: data.published,
      });

      const res = await (
        await fetch(`/api/dashboard/journal/categories/${id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        })
      ).json();

      if (res.message !== "OK") {
        setErrors(res.message);
      }

      router.push("/dashboard/journal/categories");
      router.refresh();
      return res;
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {!!hasErrors && <span>{hasErrors}</span>}

      <label htmlFor="name">
        Name
        <input type="text" id="name" {...register("name")} />
      </label>
      {errors.name && <span>{errors.name?.message}</span>}

      <label htmlFor="description">
        Description
        <textarea id="description" {...register("description")} />
      </label>
      {errors.description && <span>{errors.description?.message}</span>}

      <label htmlFor="published">
        Published
        <input type="checkbox" id="published" {...register("published")} />
      </label>

      <button type="submit" disabled={isSubmitting}>
        Edit
      </button>
    </form>
  );
}
