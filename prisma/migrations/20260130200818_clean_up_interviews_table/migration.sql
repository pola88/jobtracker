/*
  Warnings:

  - You are about to drop the column `benefits` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `compensationNotes` on the `Interview` table. All the data in the column will be lost.
  - You are about to drop the column `experienceRating` on the `Interview` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "InterviewStatus" ADD VALUE 'accepted';

DO $$
DECLARE
    interview_row RECORD;
BEGIN
    FOR interview_row IN 
        SELECT id, benefits, date 
        FROM "Interview" 
        WHERE benefits IS NOT NULL
    LOOP
        INSERT INTO "InterviewNote" ("id", "interviewId", "content", "createdAt")
        VALUES (
            gen_random_uuid()::text,
            interview_row.id,
            interview_row.benefits,
            interview_row.date
        );
    END LOOP;
END
$$;


-- AlterTable
ALTER TABLE "Interview" DROP COLUMN "benefits",
DROP COLUMN "compensationNotes",
DROP COLUMN "experienceRating";

-- DropEnum
DROP TYPE "ExperienceRating";
