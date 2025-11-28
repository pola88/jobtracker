-- CreateEnum
CREATE TYPE "CompensationType" AS ENUM ('fixed', 'hourly', 'range', 'contract');

-- CreateEnum
CREATE TYPE "ExperienceRating" AS ENUM ('very_negative', 'negative', 'neutral', 'positive', 'very_positive');

-- AlterTable
ALTER TABLE "Interview" ADD COLUMN     "compensationNotes" TEXT,
ADD COLUMN     "compensationType" "CompensationType" NOT NULL DEFAULT 'fixed',
ADD COLUMN     "compensationUpper" DECIMAL(12,2),
ADD COLUMN     "compensationValue" DECIMAL(12,2),
ADD COLUMN     "currency" TEXT DEFAULT 'USD',
ADD COLUMN     "experienceRating" "ExperienceRating" NOT NULL DEFAULT 'neutral';
