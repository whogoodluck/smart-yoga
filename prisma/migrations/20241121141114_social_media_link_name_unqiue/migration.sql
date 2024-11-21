/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `SocialMediaLink` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "SocialMediaLink_name_key" ON "SocialMediaLink"("name");
