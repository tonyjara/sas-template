/*
  Warnings:

  - Added the required column `description` to the `Scribe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Scribe" ADD COLUMN     "description" STRING NOT NULL;
