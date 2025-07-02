-- CreateTable
CREATE TABLE "ChatMessage" (
    "id" TEXT NOT NULL,
    "query" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "sessionId" TEXT NOT NULL,
    "response" TEXT NOT NULL,
    "context" TEXT,

    CONSTRAINT "ChatMessage_pkey" PRIMARY KEY ("id")
);
