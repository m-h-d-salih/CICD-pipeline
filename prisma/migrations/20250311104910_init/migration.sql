-- AlterTable
ALTER TABLE "Categories" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "Products" ADD COLUMN     "isDeleted" BOOLEAN NOT NULL DEFAULT false;
