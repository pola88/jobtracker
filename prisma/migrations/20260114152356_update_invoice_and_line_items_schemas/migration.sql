/*
  Warnings:

  - You are about to drop the column `businessProfileId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `clientId` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `lineItemId` on the `InvoiceLineItemAssignment` table. All the data in the column will be lost.
  - Added the required column `fromAddressLine1` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromCity` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromPostalCode` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fromState` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toAddressLine1` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toCity` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toPostalCode` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `toState` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `amount` to the `InvoiceLineItemAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `InvoiceLineItemAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `InvoiceLineItemAssignment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rate` to the `InvoiceLineItemAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_businessProfileId_fkey";

-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_clientId_fkey";

-- DropForeignKey
ALTER TABLE "InvoiceLineItemAssignment" DROP CONSTRAINT "InvoiceLineItemAssignment_lineItemId_fkey";

-- DropIndex
DROP INDEX "Invoice_businessProfileId_idx";

-- DropIndex
DROP INDEX "Invoice_clientId_idx";

-- DropIndex
DROP INDEX "InvoiceLineItemAssignment_invoiceId_lineItemId_key";

-- DropIndex
DROP INDEX "InvoiceLineItemAssignment_lineItemId_idx";

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "businessProfileId",
DROP COLUMN "clientId",
ADD COLUMN     "fromAddressLine1" TEXT NOT NULL,
ADD COLUMN     "fromAddressLine2" TEXT,
ADD COLUMN     "fromCity" TEXT NOT NULL,
ADD COLUMN     "fromCountry" TEXT NOT NULL DEFAULT 'US',
ADD COLUMN     "fromPostalCode" TEXT NOT NULL,
ADD COLUMN     "fromState" TEXT NOT NULL,
ADD COLUMN     "toAddressLine1" TEXT NOT NULL,
ADD COLUMN     "toAddressLine2" TEXT,
ADD COLUMN     "toCity" TEXT NOT NULL,
ADD COLUMN     "toCountry" TEXT NOT NULL DEFAULT 'US',
ADD COLUMN     "toPostalCode" TEXT NOT NULL,
ADD COLUMN     "toState" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "InvoiceLineItemAssignment" DROP COLUMN "lineItemId",
ADD COLUMN     "amount" DECIMAL(12,2) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "quantity" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "rate" DECIMAL(12,2) NOT NULL;
