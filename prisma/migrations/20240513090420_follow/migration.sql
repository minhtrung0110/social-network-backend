-- AlterTable
ALTER TABLE "posts" ALTER COLUMN "caption" SET DATA TYPE VARCHAR(10000);

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "bio" VARCHAR(256);
