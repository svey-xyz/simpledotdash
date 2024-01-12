-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Settings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT DEFAULT 0,
    "title" TEXT NOT NULL,
    "icon" TEXT
);
INSERT INTO "new_Settings" ("icon", "title") SELECT "icon", "title" FROM "Settings";
DROP TABLE "Settings";
ALTER TABLE "new_Settings" RENAME TO "Settings";
CREATE UNIQUE INDEX "Settings_id_key" ON "Settings"("id");
CREATE UNIQUE INDEX "Settings_title_key" ON "Settings"("title");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
