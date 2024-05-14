/*
  Warnings:

  - The primary key for the `follow` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `follow` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "UseCase" AS ENUM ('LOGIN', 'D2FA', 'PHV');

-- AlterTable
ALTER TABLE "follow" DROP CONSTRAINT "follow_pkey",
DROP COLUMN "id",
ADD CONSTRAINT "follow_pkey" PRIMARY KEY ("userId", "followId");

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "isPhoneVerified" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "twoFA" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Otp" (
    "id" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(5) NOT NULL,
    "useCase" "UseCase" NOT NULL,

    CONSTRAINT "Otp_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Otp" ADD CONSTRAINT "Otp_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
