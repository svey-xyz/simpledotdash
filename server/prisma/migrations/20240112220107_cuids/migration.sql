/*
  Warnings:

  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `Taxonomy` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `App` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `sessions` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `accounts` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT,
    "email_verified" DATETIME,
    "image" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_users" ("created_at", "email", "email_verified", "id", "image", "name", "updated_at") SELECT "created_at", "email", "email_verified", "id", "image", "name", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_Taxonomy" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT
);
INSERT INTO "new_Taxonomy" ("description", "id", "title") SELECT "description", "id", "title" FROM "Taxonomy";
DROP TABLE "Taxonomy";
ALTER TABLE "new_Taxonomy" RENAME TO "Taxonomy";
CREATE TABLE "new_App" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "displayURL" TEXT,
    "description" TEXT,
    "icon" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "App_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_App" ("description", "displayURL", "icon", "id", "title", "url", "userId") SELECT "description", "displayURL", "icon", "id", "title", "url", "userId" FROM "App";
DROP TABLE "App";
ALTER TABLE "new_App" RENAME TO "App";
CREATE TABLE "new_sessions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "session_token" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "expires" DATETIME NOT NULL,
    CONSTRAINT "sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_sessions" ("expires", "id", "session_token", "user_id") SELECT "expires", "id", "session_token", "user_id" FROM "sessions";
DROP TABLE "sessions";
ALTER TABLE "new_sessions" RENAME TO "sessions";
CREATE UNIQUE INDEX "sessions_session_token_key" ON "sessions"("session_token");
CREATE TABLE "new_accounts" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "user_id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "provider" TEXT NOT NULL,
    "provider_account_id" TEXT NOT NULL,
    "refresh_token" TEXT,
    "access_token" TEXT,
    "expires_at" INTEGER,
    "token_type" TEXT,
    "scope" TEXT,
    "id_token" TEXT,
    "session_state" TEXT,
    "oauth_token_secret" TEXT,
    "oauth_token" TEXT,
    CONSTRAINT "accounts_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_accounts" ("access_token", "expires_at", "id", "id_token", "oauth_token", "oauth_token_secret", "provider", "provider_account_id", "refresh_token", "scope", "session_state", "token_type", "type", "user_id") SELECT "access_token", "expires_at", "id", "id_token", "oauth_token", "oauth_token_secret", "provider", "provider_account_id", "refresh_token", "scope", "session_state", "token_type", "type", "user_id" FROM "accounts";
DROP TABLE "accounts";
ALTER TABLE "new_accounts" RENAME TO "accounts";
CREATE UNIQUE INDEX "accounts_provider_provider_account_id_key" ON "accounts"("provider", "provider_account_id");
CREATE TABLE "new__AppToTaxonomy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AppToTaxonomy_A_fkey" FOREIGN KEY ("A") REFERENCES "App" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AppToTaxonomy_B_fkey" FOREIGN KEY ("B") REFERENCES "Taxonomy" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__AppToTaxonomy" ("A", "B") SELECT "A", "B" FROM "_AppToTaxonomy";
DROP TABLE "_AppToTaxonomy";
ALTER TABLE "new__AppToTaxonomy" RENAME TO "_AppToTaxonomy";
CREATE UNIQUE INDEX "_AppToTaxonomy_AB_unique" ON "_AppToTaxonomy"("A", "B");
CREATE INDEX "_AppToTaxonomy_B_index" ON "_AppToTaxonomy"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
