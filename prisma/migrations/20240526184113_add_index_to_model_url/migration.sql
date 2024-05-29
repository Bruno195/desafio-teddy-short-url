-- CreateIndex
CREATE INDEX "urls_userId_created_at_fullUrl_idx" ON "urls"("userId", "created_at", "fullUrl");
