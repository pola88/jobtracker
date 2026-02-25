/*
  Warnings:

  - You are about to drop the column `fromAddressLine1` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `fromAddressLine2` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `fromCity` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `fromCountry` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `fromPostalCode` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `fromState` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `toAddressLine1` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `toAddressLine2` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `toCity` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `toCountry` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `toPostalCode` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `toState` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the `Client` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `businessProfileId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `clientProfileId` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Client" DROP CONSTRAINT "Client_userId_fkey";

-- AlterTable
ALTER TABLE "BusinessProfile" ADD COLUMN     "isClient" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "fromAddressLine1",
DROP COLUMN "fromAddressLine2",
DROP COLUMN "fromCity",
DROP COLUMN "fromCountry",
DROP COLUMN "fromPostalCode",
DROP COLUMN "fromState",
DROP COLUMN "toAddressLine1",
DROP COLUMN "toAddressLine2",
DROP COLUMN "toCity",
DROP COLUMN "toCountry",
DROP COLUMN "toPostalCode",
DROP COLUMN "toState",
ADD COLUMN     "businessProfileId" TEXT NOT NULL,
ADD COLUMN     "clientProfileId" TEXT NOT NULL;

-- DropTable
DROP TABLE "Client";

-- CreateIndex
CREATE INDEX "BusinessProfile_userId_isClient_idx" ON "BusinessProfile"("userId", "isClient");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_businessProfileId_fkey" FOREIGN KEY ("businessProfileId") REFERENCES "BusinessProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_clientProfileId_fkey" FOREIGN KEY ("clientProfileId") REFERENCES "BusinessProfile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
