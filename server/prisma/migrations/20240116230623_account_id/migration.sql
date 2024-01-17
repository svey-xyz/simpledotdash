/*
  Warnings:

  - You are about to drop the column `providerId` on the `sessions` table. All the data in the column will be lost.
  - You are about to drop the column `providerType` on the `sessions` table. All the data in the column will be lost.
  - Added the required column `provider` to the `sessions` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_sessions" ("accessToken", "accessTokenExpires", "createdAt", "id", "providerAccountId", "refreshToken", "updatedAt", "userId") SELECT "accessToken", "accessTokenExpires", "createdAt", "id", "providerAccountId", "refreshToken", "updatedAt", "userId" FROM "sessions";
DROP TABLE "sessions";
ALTER TABLE "new_sessions" RENAME TO "sessions";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
