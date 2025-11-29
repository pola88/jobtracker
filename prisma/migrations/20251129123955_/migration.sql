/*
  Warnings:

  - The values [range,contract] on the enum `CompensationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "CompensationType_new" AS ENUM ('fixed', 'hourly');
ALTER TABLE "Interview" ALTER COLUMN "compensationType" DROP DEFAULT;
ALTER TABLE "Interview" ALTER COLUMN "compensationType" TYPE "CompensationType_new" USING ("compensationType"::text::"CompensationType_new");
ALTER TYPE "CompensationType" RENAME TO "CompensationType_old";
ALTER TYPE "CompensationType_new" RENAME TO "CompensationType";
DROP TYPE "CompensationType_old";
ALTER TABLE "Interview" ALTER COLUMN "compensationType" SET DEFAULT 'fixed';
COMMIT;
