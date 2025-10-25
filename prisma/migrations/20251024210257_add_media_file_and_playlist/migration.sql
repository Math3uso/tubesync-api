-- CreateTable
CREATE TABLE "public"."mediaFiles" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mediaId" TEXT NOT NULL,
    "userId" TEXT,
    "playlistId" TEXT,

    CONSTRAINT "mediaFiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Playlist" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Playlist_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."mediaFiles" ADD CONSTRAINT "mediaFiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."mediaFiles" ADD CONSTRAINT "mediaFiles_playlistId_fkey" FOREIGN KEY ("playlistId") REFERENCES "public"."Playlist"("id") ON DELETE SET NULL ON UPDATE CASCADE;
