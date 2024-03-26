/*
  Warnings:

  - You are about to drop the column `accessToken` on the `seessions` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `seessions` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `seessions` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `seessions` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `seessions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_seessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "sessionToken" TEXT NOT NULL,
    CONSTRAINT "seessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_seessions" ("expires", "id", "sessionToken") SELECT "expires", "id", "sessionToken" FROM "seessions";
DROP TABLE "seessions";
ALTER TABLE "new_seessions" RENAME TO "seessions";
CREATE UNIQUE INDEX "seessions_sessionToken_key" ON "seessions"("sessionToken");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
