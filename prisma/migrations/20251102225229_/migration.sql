/*
  Warnings:

  - A unique constraint covering the columns `[refrashToken]` on the table `Session` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Session_refrashToken_key" ON "public"."Session"("refrashToken");
