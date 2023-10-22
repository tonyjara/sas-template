-- CreateTable
CREATE TABLE "ScribeChat" (
    "id" STRING NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "role" STRING NOT NULL,
    "content" STRING NOT NULL,
    "scribeId" INT4 NOT NULL,

    CONSTRAINT "ScribeChat_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ScribeChat" ADD CONSTRAINT "ScribeChat_scribeId_fkey" FOREIGN KEY ("scribeId") REFERENCES "Scribe"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
