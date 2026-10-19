-- Authentication now lives in Supabase Auth; "User" keeps only the profile and role.
-- Existing users must be re-created through Supabase Auth (see prisma/seed.ts).

-- DropTable
DROP TABLE "Account";

-- DropTable
DROP TABLE "Session";

-- DropTable
DROP TABLE "VerificationToken";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "cloudinaryApiKey",
DROP COLUMN "cloudinaryApiSecret",
DROP COLUMN "cloudinaryCloudName",
DROP COLUMN "emailVerified",
DROP COLUMN "password",
ALTER COLUMN "id" DROP DEFAULT;
