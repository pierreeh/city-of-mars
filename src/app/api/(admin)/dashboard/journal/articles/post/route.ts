import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { JournalArticlesSchema } from "@/schemas/journal/JournalArticlesSchema";
import { db } from "@/lib/db";
import slugify from "@/lib/slugify";

export async function JournalArticlePost(req: Request) {
  const session = await getServerSession(authOptions);

  if (req.method !== "POST") {
    return new NextResponse(
      JSON.stringify({ message: `Method ${req.method} not allowed.` }),
      { status: 405 }
    );
  }

  try {
    const response = await req.json();
    const res = JournalArticlesSchema.safeParse(response);

    if (!res.success) {
      const { errors } = res.error;

      return new NextResponse(
        JSON.stringify({ message: "Invalid request", errors }),
        {
          status: 400,
        }
      );
    }

    const journalArticle = await db.journalArticles.create({
      data: {
        userId: session?.user.id,
        categoryId: res.data.categoryId,
        name: res.data.name,
        slug: slugify(res.data.name),
        body: res.data.body,
        published: res.data.published,
      },
    });

    return new NextResponse(JSON.stringify({ journalArticle, message: "OK" }), {
      status: 201,
    });
  } catch (e: any) {
    return new NextResponse(JSON.stringify({ message: e.message }), {
      status: e.statusCode || 500,
    });
  }
}

export { JournalArticlePost as POST };
