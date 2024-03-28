-- CreateTable
CREATE TABLE "journal_articles" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "category_id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "body" TEXT NOT NULL,
    "published" BOOLEAN NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "journal_articles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "journal_articles" ADD CONSTRAINT "journal_articles_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "journal_articles" ADD CONSTRAINT "journal_articles_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "journal_categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
