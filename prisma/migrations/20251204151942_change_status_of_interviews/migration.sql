/*
  Warnings:

  - The values [applied,screening,tech,offer] on the enum `InterviewStatus` will be removed. If these variants are still used in the database, this will fail.

*/
BEGIN;
ALTER TYPE "InterviewStatus" RENAME TO "InterviewStatus_old";
CREATE TYPE "InterviewStatus" AS ENUM ('active', 'stand_by', 'not_interested', 'rejected');
ALTER TABLE "Interview"
  ALTER COLUMN "status" DROP DEFAULT,
  ALTER COLUMN "status" TYPE "InterviewStatus"
  USING (
    CASE "status"::text
      WHEN 'applied' THEN 'active'
      WHEN 'screening' THEN 'active'
      WHEN 'tech' THEN 'active'
      WHEN 'offer' THEN 'stand_by'
      WHEN 'rejected' THEN 'rejected'
      ELSE 'active'
    END::text::"InterviewStatus"
  );
DROP TYPE "InterviewStatus_old";
ALTER TABLE "Interview" ALTER COLUMN "status" SET DEFAULT 'active';
COMMIT;
