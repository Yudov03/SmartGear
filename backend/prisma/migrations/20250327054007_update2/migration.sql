-- CreateTable
CREATE TABLE "Engine" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "company" TEXT NOT NULL,
    "Type" TEXT NOT NULL,
    "P_dc" DOUBLE PRECISION NOT NULL,
    "n_dc" INTEGER NOT NULL,
    "Voltage" TEXT NOT NULL,
    "Current" TEXT NOT NULL,
    "Efficiency" DOUBLE PRECISION NOT NULL,
    "Power_Fractor" DOUBLE PRECISION NOT NULL,
    "Max_Torque_Ratio" DOUBLE PRECISION NOT NULL,
    "Start_Torque_Ratio" DOUBLE PRECISION NOT NULL,
    "Start_Current_Ratio" DOUBLE PRECISION NOT NULL,
    "Weight" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Engine_pkey" PRIMARY KEY ("id")
);
