/*
  Warnings:

  - Made the column `subscriptionId` on table `Scribe` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Scribe" DROP CONSTRAINT "Scribe_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "Scribe" ALTER COLUMN "subscriptionId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Scribe" ADD CONSTRAINT "Scribe_subscriptionId_fkey" FOREIGN KEY ("subscriptionId") REFERENCES "Subscription"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
