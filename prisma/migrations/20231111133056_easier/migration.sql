/*
  Warnings:

  - You are about to drop the `Skill` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `attackModifier` to the `Player` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blockAmount` to the `Player` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Skill" DROP CONSTRAINT "Skill_playerId_fkey";

-- AlterTable
ALTER TABLE "Player" ADD COLUMN     "attackModifier" INTEGER NOT NULL,
ADD COLUMN     "blockAmount" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Skill";
