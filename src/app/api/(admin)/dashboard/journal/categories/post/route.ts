import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/lib/db";
import slugify from "@/lib/slugify";
import { JournalCategoriesSchema } from "@/schemas/journal/JournalCategoriesSchema";

export async function JournalCategoryPost(req: Request) {
  const session = await getServerSession(authOptions);

  if (req.method !== "POST") {
    return new NextResponse(
      JSON.stringify({ message: `Method ${req.method} not allowed.` }),
      { status: 405 }
    );
  }

  try {
    const response = await req.json();
    const res = JournalCategoriesSchema.safeParse(response);

    if (!res.success) {
      const { errors } = res.error;

      return new NextResponse(
        JSON.stringify({ message: "Invalid request", errors }),
        {
          status: 400,
        }
      );
    }

    const journalCategory = await db.journalCategories.create({
      data: {
        userId: session?.user.id,
        name: res.data.name,
        slug: slugify(res.data.name),
        description: res.data.description,
        published: res.data.published,
      },
    });

    return new NextResponse(
      JSON.stringify({ journalCategory, message: "OK" }),
      {
        status: 201,
      }
    );
  } catch (e: any) {
    return new NextResponse(JSON.stringify({ message: e.message }), {
      status: e.statusCode || 500,
    });
  }
}

export { JournalCategoryPost as POST };
