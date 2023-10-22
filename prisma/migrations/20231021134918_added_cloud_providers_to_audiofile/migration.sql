/*
  Warnings:

  - Added the required column `cloudProvider` to the `AudioFile` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CloudProviders" AS ENUM ('aws', 'azure', 'gcp', 'cloudflare');

-- AlterTable
ALTER TABLE "AudioFile" ADD COLUMN     "cloudProvider" "CloudProviders" NOT NULL;
ALTER TABLE "AudioFile" ALTER COLUMN "type" DROP DEFAULT;
