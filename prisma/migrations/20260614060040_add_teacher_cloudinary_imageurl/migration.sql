-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "News" ADD COLUMN     "imageUrl" TEXT;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "cloudinaryApiKey" TEXT,
ADD COLUMN     "cloudinaryApiSecret" TEXT,
ADD COLUMN     "cloudinaryCloudName" TEXT;

-- CreateTable
CREATE TABLE "Teacher" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "title" TEXT,
    "specialty" TEXT,
    "email" TEXT,
    "photo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Teacher_pkey" PRIMARY KEY ("id")
);
