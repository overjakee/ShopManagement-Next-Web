import { useRouter } from "next/router";
import { useState } from "react";

// ข้อมูลเดียวกับ mockProducts ด้านบน (จริงๆ ให้ดึง API มา)
const mockProducts = Array.from({ length: 40 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  image: `https://via.placeholder.com/400x300?text=Product+${i + 1}`,
  price: (i + 1) * 50,
  category: i % 2 === 0 ? "Electronics" : "Clothing",
  description:
    "นี่คือรายละเอียดสินค้าอย่างย่อ เพื่อให้ผู้ใช้เข้าใจสินค้านี้มากขึ้น และช่วยในการตัดสินใจซื้อ",
}));

export default function ProductDetailPage() {
  const router = useRouter();
  const { productId } = router.query;

  // หา product ตาม productId (แปลงเป็น number ก่อน)
  const product = mockProducts.find(
    (p) => p.id === Number(productId)
  );

  const [quantity, setQuantity] = useState(1);

  if (!product) {
    return (
      <div className="p-6 max-w-screen-md mx-auto text-center">
        <h2 className="text-2xl font-semibold mb-4">ไม่พบสินค้า</h2>
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:underline"
        >
          กลับไปหน้าร้านค้า
        </button>
      </div>
    );
  }

  const increaseQty = () => setQuantity((q) => q + 1);
  const decreaseQty = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const addToCart = () => {
    alert(`เพิ่มสินค้า "${product.name}" จำนวน ${quantity} ลงตะกร้า`);
    // TODO: เชื่อมระบบตะกร้าจริง ๆ
  };

  return (
    <div className="p-6 max-w-screen-md mx-auto flex flex-col md:flex-row gap-8">
      {/* รูปสินค้าซ้าย */}
      <div className="md:w-1/2">
        <img
          src={product.image}
          alt={product.name}
          className="w-full rounded-lg object-cover"
        />
      </div>

      {/* รายละเอียดสินค้า ขวา */}
      <div className="md:w-1/2 flex flex-col justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
          <p className="text-sm text-gray-500 mb-4">
            ประเภท: <span className="font-medium">{product.category}</span>
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>
        </div>

        {/* ปุ่มบวกลบจำนวน และ เพิ่มตะกร้า */}
        <div className="flex items-center gap-4">
          <div className="flex items-center border rounded-lg overflow-hidden">
            <button
              onClick={decreaseQty}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition"
            >
              -
            </button>
            <span className="px-6 py-2 border-x text-lg">{quantity}</span>
            <button
              onClick={increaseQty}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 transition"
            >
              +
            </button>
          </div>

          <button
            onClick={addToCart}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold"
          >
            เพิ่มสินค้าลงตะกร้า
          </button>
        </div>
      </div>
    </div>
  );
}
