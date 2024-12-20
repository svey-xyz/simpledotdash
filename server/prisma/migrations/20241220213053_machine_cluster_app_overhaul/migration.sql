/*
  Warnings:

  - The primary key for the `Settings` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id]` on the table `taxonomies` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `userId` to the `Settings` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clusterId` to the `apps` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "machine_clusters" (
    "machineId" TEXT NOT NULL,
    "clusterId" TEXT NOT NULL,

    PRIMARY KEY ("machineId", "clusterId"),
    CONSTRAINT "machine_clusters_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "machines" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "machine_clusters_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "clusters" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "clusters" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "icon" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Settings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Settings" ("icon", "id", "title") SELECT "icon", "id", "title" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
CREATE UNIQUE INDEX "Settings_id_key" ON "Settings"("id");
CREATE UNIQUE INDEX "Settings_title_key" ON "Settings"("title");
CREATE UNIQUE INDEX "Settings_userId_key" ON "Settings"("userId");
CREATE TABLE "new_apps" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "displayURL" TEXT,
    "description" TEXT,
    "icon" TEXT,
    "userId" TEXT NOT NULL,
    "machineId" TEXT NOT NULL,
    "clusterId" TEXT NOT NULL,
    CONSTRAINT "apps_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "apps_machineId_fkey" FOREIGN KEY ("machineId") REFERENCES "machines" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "apps_clusterId_fkey" FOREIGN KEY ("clusterId") REFERENCES "clusters" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_apps" ("description", "displayURL", "icon", "id", "machineId", "title", "url", "userId") SELECT "description", "displayURL", "icon", "id", "machineId", "title", "url", "userId" FROM "apps";
DROP TABLE "apps";
ALTER TABLE "new_apps" RENAME TO "apps";
CREATE UNIQUE INDEX "apps_id_key" ON "apps"("id");
CREATE TABLE "new_machines" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "clusters_id_key" ON "clusters"("id");

-- CreateIndex
CREATE UNIQUE INDEX "taxonomies_id_key" ON "taxonomies"("id");
