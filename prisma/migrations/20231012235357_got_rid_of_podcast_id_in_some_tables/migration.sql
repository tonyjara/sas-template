/*
  Warnings:

  - You are about to drop the column `podcastId` on the `AudioFile` table. All the data in the column will be lost.
  - You are about to drop the column `selectedPodcastId` on the `Preferences` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "AudioFile" DROP COLUMN "podcastId";

-- AlterTable
ALTER TABLE "Preferences" DROP COLUMN "selectedPodcastId";
