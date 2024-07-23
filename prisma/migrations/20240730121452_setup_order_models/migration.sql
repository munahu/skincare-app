-- CreateTable
CREATE TABLE "orders" (
    "id" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "productCount" INTEGER NOT NULL,
    "totalCost" INTEGER NOT NULL,
    "totalSavings" INTEGER,
    "user_id" TEXT,
    "guestName" TEXT,
    "guestEmail" TEXT,
    "addressLine1" TEXT NOT NULL,
    "addressLine2" TEXT,
    "city" TEXT NOT NULL,
    "province" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,

    CONSTRAINT "orders_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "regularPrice" INTEGER NOT NULL,
    "salePrice" INTEGER,
    "image" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "selectedSize" TEXT,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_OrderToOrderedProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_OrderToOrderedProduct_AB_unique" ON "_OrderToOrderedProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_OrderToOrderedProduct_B_index" ON "_OrderToOrderedProduct"("B");

-- AddForeignKey
ALTER TABLE "orders" ADD CONSTRAINT "orders_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToOrderedProduct" ADD CONSTRAINT "_OrderToOrderedProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "orders"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_OrderToOrderedProduct" ADD CONSTRAINT "_OrderToOrderedProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "products"("id") ON DELETE CASCADE ON UPDATE CASCADE;
