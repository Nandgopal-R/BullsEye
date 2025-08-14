/*
  Warnings:

  - A unique constraint covering the columns `[symbol]` on the table `Company` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `updatedAt` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Company" ADD COLUMN     "order" INTEGER NOT NULL DEFAULT 1000,
ADD COLUMN     "sector" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Company_symbol_key" ON "public"."Company"("symbol");

-- CreateIndex
CREATE INDEX "Company_order_idx" ON "public"."Company"("order");
