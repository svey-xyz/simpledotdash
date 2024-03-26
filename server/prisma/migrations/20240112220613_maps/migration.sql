/*
  Warnings:

  - You are about to drop the `App` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Taxonomy` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "App";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Taxonomy";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "apps" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "displayURL" TEXT,
    "description" TEXT,
    "icon" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "apps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "taxonomies" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new__AppToTaxonomy" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_AppToTaxonomy_A_fkey" FOREIGN KEY ("A") REFERENCES "apps" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_AppToTaxonomy_B_fkey" FOREIGN KEY ("B") REFERENCES "taxonomies" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new__AppToTaxonomy" ("A", "B") SELECT "A", "B" FROM "_AppToTaxonomy";
DROP TABLE "_AppToTaxonomy";
ALTER TABLE "new__AppToTaxonomy" RENAME TO "_AppToTaxonomy";
CREATE UNIQUE INDEX "_AppToTaxonomy_AB_unique" ON "_AppToTaxonomy"("A", "B");
CREATE INDEX "_AppToTaxonomy_B_index" ON "_AppToTaxonomy"("B");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
