-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT ''
);

-- CreateTable
CREATE TABLE "Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT,
    "description" TEXT,
    "price" REAL,
    "discountPercentage" REAL,
    "rating" REAL,
    "stock" INTEGER,
    "brand" TEXT,
    "category" TEXT,
    "thumbnail" TEXT
);

-- CreateTable
CREATE TABLE "Image" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "url" TEXT,
    "produtoId" INTEGER NOT NULL,
    CONSTRAINT "Image_produtoId_fkey" FOREIGN KEY ("produtoId") REFERENCES "Product" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
