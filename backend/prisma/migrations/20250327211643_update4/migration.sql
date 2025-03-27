/*
  Warnings:

  - You are about to drop the column `u_h` on the `projects` table. All the data in the column will be lost.
  - Added the required column `u_d` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "u_h",
ADD COLUMN     "u_d" DOUBLE PRECISION NOT NULL;
