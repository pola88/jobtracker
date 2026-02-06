/*
  Warnings:

  - You are about to drop the column `completedAt` on the `InterviewStep` table. All the data in the column will be lost.
  - You are about to drop the column `outcome` on the `InterviewStep` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `InterviewStep` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "InterviewStepStatus" AS ENUM ('passed', 'neutral', 'failed', 'canceled', 'scheduled', 'waiting');

ALTER TABLE "InterviewStep" ADD COLUMN "status" "InterviewStepStatus" NOT NULL DEFAULT 'scheduled';


DO $$
BEGIN
  UPDATE "InterviewStep"
  SET "status" = 
    CASE
      WHEN "outcome" = 'passed' THEN 'passed'::"InterviewStepStatus"
      WHEN "outcome" = 'neutral' THEN 'neutral'::"InterviewStepStatus"
      WHEN "outcome" = 'failed' THEN 'failed'::"InterviewStepStatus"
      WHEN "outcome" = 'canceled' THEN 'canceled'::"InterviewStepStatus"
      WHEN "outcome" = 'waiting' THEN 'waiting'::"InterviewStepStatus"
      ELSE 'scheduled'::"InterviewStepStatus"
    END
  WHERE "outcome" IS NOT NULL;
END
$$;

-- AlterTable
ALTER TABLE "InterviewStep" DROP COLUMN "completedAt",
DROP COLUMN "outcome",
DROP COLUMN "type";
