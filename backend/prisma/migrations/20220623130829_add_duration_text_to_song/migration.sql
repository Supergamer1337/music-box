/*
  Warnings:

  - Added the required column `durationText` to the `Song` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Song" ADD COLUMN     "durationText" TEXT NOT NULL;
