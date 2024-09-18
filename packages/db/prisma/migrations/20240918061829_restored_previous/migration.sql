/*
  Warnings:

  - Made the column `provider` on table `onRampTransaction` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "onRampTransaction" ALTER COLUMN "provider" SET NOT NULL;
