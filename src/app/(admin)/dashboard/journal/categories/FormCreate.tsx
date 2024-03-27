"use client";

import { useState } from "react";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";

import { JournalCategoriesSchema } from "@/schemas/journal/JournalCategoriesSchema";

type JournalCategories = z.infer<typeof JournalCategoriesSchema>;

export default function FormCreate() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<JournalCategories>({
    resolver: zodResolver(JournalCategoriesSchema),
  });
  const router = useRouter();
  const [hasErrors, setErrors] = useState();

  async function onSubmit(data: JournalCategories) {
    try {
      const body = JSON.stringify({
        name: data.name,
        description: data.description,
        published: data.published,
      });

      const res = await (
        await fetch("/api/dashboard/journal/categories/post", {
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

      reset();
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
