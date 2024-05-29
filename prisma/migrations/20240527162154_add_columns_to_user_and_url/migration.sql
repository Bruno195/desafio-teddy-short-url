/*
  Warnings:

  - You are about to drop the column `fullUrl` on the `urls` table. All the data in the column will be lost.
  - You are about to drop the column `shortUrl` on the `urls` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `urls` table. All the data in the column will be lost.
  - Added the required column `full_url` to the `urls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `short_url` to the `urls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `total_access` to the `urls` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `users` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "urls" DROP CONSTRAINT "urls_userId_fkey";

-- DropIndex
DROP INDEX "urls_userId_created_at_fullUrl_idx";

-- AlterTable
ALTER TABLE "urls" DROP COLUMN "fullUrl",
DROP COLUMN "shortUrl",
DROP COLUMN "userId",
ADD COLUMN     "deleted_at" TIMESTAMP(3),
ADD COLUMN     "full_url" TEXT NOT NULL,
ADD COLUMN     "short_url" TEXT NOT NULL,
ADD COLUMN     "total_access" INTEGER NOT NULL,
ADD COLUMN     "user_id" TEXT;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "name" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "urls_id_user_id_created_at_full_url_idx" ON "urls"("id", "user_id", "created_at", "full_url");

-- AddForeignKey
ALTER TABLE "urls" ADD CONSTRAINT "urls_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;
