/*
  Warnings:

  - You are about to drop the column `full_url` on the `urls` table. All the data in the column will be lost.
  - Added the required column `original_url` to the `urls` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "urls_id_user_id_created_at_full_url_idx";

-- AlterTable
ALTER TABLE "urls" DROP COLUMN "full_url",
ADD COLUMN     "original_url" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "urls_id_user_id_created_at_original_url_idx" ON "urls"("id", "user_id", "created_at", "original_url");
