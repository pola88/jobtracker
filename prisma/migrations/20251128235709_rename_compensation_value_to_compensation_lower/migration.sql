/*
  Warnings:

  - You are about to drop the column `compensationValue` on the `Interview` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "compensationValue",
ADD COLUMN     "compensationLower" DECIMAL(12,2);
