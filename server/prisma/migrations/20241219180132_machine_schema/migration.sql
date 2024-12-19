/*
  Warnings:

  - Added the required column `machineId` to the `apps` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "machines" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "dashboardURL" TEXT,
    "description" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "machines_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_apps" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "displayURL" TEXT,
    "description" TEXT,
    "icon" TEXT,
    "userId" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    CONSTRAINT "apps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "apps_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "machines" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_apps" ("description", "displayURL", "icon", "id", "title", "url", "userId") SELECT "description", "displayURL", "icon", "id", "title", "url", "userId" FROM "apps";
DROP TABLE "apps";
ALTER TABLE "new_apps" RENAME TO "apps";
CREATE UNIQUE INDEX "apps_id_key" ON "apps"("id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "machines_id_key" ON "machines"("id");
