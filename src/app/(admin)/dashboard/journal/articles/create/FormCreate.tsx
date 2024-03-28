"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { JournalArticlesSchema } from "@/schemas/journal/JournalArticlesSchema";

type JournalArticle = z.infer<typeof JournalArticlesSchema>;

export default function FormCreate({ journalCategories }: any) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<JournalArticle>({
    resolver: zodResolver(JournalArticlesSchema),
  });
  const router = useRouter();
  const [hasErrors, setErrors] = useState();

  async function onSubmit(data: JournalArticle) {
    try {
      const body = JSON.stringify({
        name: data.name,
        body: data.body,
        categoryId: data.categoryId,
        published: data.published,
      });

      const res = await (
        await fetch("/api/dashboard/journal/articles/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body,
        })
      ).json();

      if (res.message !== "OK") {
        setErrors(res.message);
      }

      router.push("/dashboard/journal/articles");
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

      <label htmlFor="body">
        Body
        <textarea id="body" {...register("body")} />
      </label>
      {errors.body && <span>{errors.body?.message}</span>}

      <label htmlFor="categoryId">
        Category
        <select id="categoryId" {...register("categoryId")}>
          {journalCategories.map((j: any) => (
            <option key={j.id} value={j.id}>
              {j.name}
            </option>
          ))}
        </select>
      </label>

      <label htmlFor="published">
        Published
        <input
          type="checkbox"
          id="published"
          defaultChecked
          {...register("published")}
        />
      </label>

      <button type="submit" disabled={isSubmitting}>
        Create
      </button>
    </form>
  );
}
