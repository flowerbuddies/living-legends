/*
  Warnings:

  - You are about to drop the `Gear` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Gear" DROP CONSTRAINT "Gear_playerId_fkey";

-- DropTable
DROP TABLE "Gear";
