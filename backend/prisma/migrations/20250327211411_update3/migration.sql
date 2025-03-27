/*
  Warnings:

  - You are about to drop the column `param1` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `param2` on the `projects` table. All the data in the column will be lost.
  - You are about to drop the column `param3` on the `projects` table. All the data in the column will be lost.
  - Added the required column `L` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `P` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `P1` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `P2` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `P3` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `P_ct` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `P_real` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `T1` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `T2` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `T3` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `T_dc` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `T_tt` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `n` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `n1` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `n2` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `n3` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `n_real` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `n_sb` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `status` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `u_brc` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `u_brt` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `u_h` to the `projects` table without a default value. This is not possible if the table is not empty.
  - Added the required column `u_kn` to the `projects` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "projects" DROP COLUMN "param1",
DROP COLUMN "param2",
DROP COLUMN "param3",
ADD COLUMN     "L" INTEGER NOT NULL,
ADD COLUMN     "P" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "P1" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "P2" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "P3" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "P_ct" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "P_real" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "T1" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "T2" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "T3" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "T_dc" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "T_tt" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "n" INTEGER NOT NULL,
ADD COLUMN     "n1" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "n2" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "n3" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "n_real" INTEGER NOT NULL,
ADD COLUMN     "n_sb" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ADD COLUMN     "status" BOOLEAN NOT NULL,
ADD COLUMN     "u_brc" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "u_brt" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "u_h" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "u_kn" DOUBLE PRECISION NOT NULL;
