/*
  Warnings:

  - You are about to drop the column `authorId` on the `App` table. All the data in the column will be lost.
  - You are about to drop the column `content` on the `App` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `App` table. All the data in the column will be lost.
  - Added the required column `url` to the `App` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `App` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Settings" (
    "title" TEXT NOT NULL,
    "icon" TEXT
);

-- CreateTable
CREATE TABLE "Taxonomy" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "_AppToTaxonomy" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,
    CONSTRAINT "_AppToTaxonomy_A_fkey" FOREIGN KEY ("A") REFERENCES "App" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AppToTaxonomy_B_fkey" FOREIGN KEY ("B") REFERENCES "Taxonomy" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_App" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "displayURL" TEXT,
    "description" TEXT,
    "icon" TEXT,
    "userId" INTEGER NOT NULL,
    CONSTRAINT "App_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_App" ("id", "title") SELECT "id", "title" FROM "App";
DROP TABLE "App";
ALTER TABLE "new_App" RENAME TO "App";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Settings_title_key" ON "Settings"("title");

-- CreateIndex
CREATE UNIQUE INDEX "_AppToTaxonomy_AB_unique" ON "_AppToTaxonomy"("A", "B");

-- CreateIndex
CREATE INDEX "_AppToTaxonomy_B_index" ON "_AppToTaxonomy"("B");
