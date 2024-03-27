import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

import { db } from "@/lib/db";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { JournalCategoriesSchema } from "@/schemas/journal/JournalCategoriesSchema";

export async function journalCategoryPatch(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);

  if (req.method !== "PATCH") {
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
        JSON.stringify({ error: { message: "Invalid request", errors } }),
        {
          status: 400,
        }
      );
    }

    const journalCategory = await db.journalCategories.update({
      where: { id: params.id },
      data: {
        userId: session?.user.id,
        name: res.data.name,
        description: res.data.description,
        published: res.data.published,
      },
    });

    return new NextResponse(
      JSON.stringify({ journalCategory, message: "OK" }),
      {
        status: 200,
      }
    );
  } catch (e: any) {
    return new NextResponse(JSON.stringify({ message: e.message }), {
      status: e.statusCode || 500,
    });
  }
}

export { journalCategoryPatch as PATCH };
