/*
  Warnings:

  - You are about to drop the `VerificationRequest` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropIndex
DROP INDEX "VerificationRequest_identifier_token_key";

-- DropIndex
DROP INDEX "VerificationRequest_token_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "VerificationRequest";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "verificationtokens" (
    "identifier" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expires" DATETIME NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_seessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    "sessionToken" TEXT NOT NULL,
    "accessToken" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "seessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_seessions" ("accessToken", "createdAt", "expires", "id", "sessionToken", "updatedAt", "userId") SELECT "accessToken", "createdAt", "expires", "id", "sessionToken", "updatedAt", "userId" FROM "seessions";
DROP TABLE "seessions";
ALTER TABLE "new_seessions" RENAME TO "seessions";
CREATE UNIQUE INDEX "seessions_sessionToken_key" ON "seessions"("sessionToken");
CREATE UNIQUE INDEX "seessions_accessToken_key" ON "seessions"("accessToken");
CREATE TABLE "new_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "providerType" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "providerAccountId" TEXT NOT NULL,
    "refreshToken" TEXT,
    "accessToken" TEXT,
    "accessTokenExpires" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "sessions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_sessions" ("accessToken", "accessTokenExpires", "createdAt", "id", "providerAccountId", "providerId", "providerType", "refreshToken", "updatedAt", "userId") SELECT "accessToken", "accessTokenExpires", "createdAt", "id", "providerAccountId", "providerId", "providerType", "refreshToken", "updatedAt", "userId" FROM "sessions";
DROP TABLE "sessions";
ALTER TABLE "new_sessions" RENAME TO "sessions";
CREATE UNIQUE INDEX "sessions_providerId_providerAccountId_key" ON "sessions"("providerId", "providerAccountId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_token_key" ON "verificationtokens"("token");

-- CreateIndex
CREATE UNIQUE INDEX "verificationtokens_identifier_token_key" ON "verificationtokens"("identifier", "token");
