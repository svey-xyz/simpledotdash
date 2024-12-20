/*
  Warnings:

  - Added the required column `userId` to the `clusters` table without a default value. This is not possible if the table is not empty.
  - Added the required column `physical` to the `machines` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_clusters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "clusters_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_clusters" ("description", "id", "title") SELECT "description", "id", "title" FROM "clusters";
DROP TABLE "clusters";
ALTER TABLE "new_clusters" RENAME TO "clusters";
CREATE UNIQUE INDEX "clusters_id_key" ON "clusters"("id");
CREATE TABLE "new_machines" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "physical" BOOLEAN NOT NULL,
    "dashboardURL" TEXT,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "machines_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_machines" ("dashboardURL", "description", "id", "ip", "title", "userId") SELECT "dashboardURL", "description", "id", "ip", "title", "userId" FROM "machines";
DROP TABLE "machines";
ALTER TABLE "new_machines" RENAME TO "machines";
CREATE UNIQUE INDEX "machines_id_key" ON "machines"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
