import Link from "next/link";
import { useRef, useState, useEffect } from "react";

// Mock ข้อมูลสินค้า (เพิ่มรายละเอียดสินค้าด้วย)
const mockProducts = Array.from({ length: 18 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  image: `https://via.placeholder.com/200x150?text=Product+${i + 1}`,
  price: (i + 1) * 50,
  category: i % 2 === 0 ? "Electronics" : "Clothing",
  description:
    "นี่คือรายละเอียดสินค้าอย่างย่อ เพื่อให้ผู้ใช้เข้าใจสินค้านี้มากขึ้น และช่วยในการตัดสินใจซื้อ",
}));

export default function ShopPage() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const ITEMS_PER_PAGE = 16;

  const categories = Array.from(new Set(mockProducts.map((p) => p.category)));
  const filtered = mockProducts.filter(
    (p) =>
      (!selectedCategory || p.category === selectedCategory) &&
      p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const currentItems = filtered.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  // ⭐ Drag Scroll Logic สำหรับสินค้ายอดนิยม
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    
  }, []);

  return (
    <div className="p-6 max-w-screen-xl mx-auto">
      {/* สินค้ายอดนิยม */}
      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
          สินค้ายอดนิยม
        </h2>
        <div
          ref={scrollRef}
          className="overflow-x-auto flex gap-4 w-full cursor-grab select-none"
        >
          {mockProducts.slice(0, 10).map((product) => (
            <Link key={product.id} href={`/shoppage/${product.id}`} className="min-w-[200px] bg-white rounded-xl border shadow hover:shadow-lg transition p-3 cursor-pointer">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-36 object-cover rounded-md"
              />
              <h3 className="text-base font-medium mt-2 truncate">{product.name}</h3>
              <p className="text-sm text-gray-500">฿{product.price}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Filter */}
      <section className="mb-8">
        <div className="flex flex-wrap gap-3 items-center">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">ทุกประเภท</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>

          <input
            type="text"
            placeholder="ค้นหาสินค้า"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => setCurrentPage(1)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm"
          >
            ค้นหา
          </button>
        </div>
      </section>

      {/* Grid + Pagination */}
      <section>
        {currentItems.length === 0 ? (
          <p className="text-gray-500">ไม่พบสินค้าที่ตรงกับเงื่อนไข</p>
        ) : (
          <>
            {/* Product Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentItems.map((product) => (
                <Link
                  key={product.id}
                  href={`/shoppage/${product.id}`}
                  className="bg-white border rounded-xl p-4 shadow-sm hover:shadow-lg transition cursor-pointer"
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded-md mb-3"
                  />
                  <h3 className="text-lg font-semibold truncate">{product.name}</h3>
                  <p className="text-gray-500 mb-2">฿{product.price}</p>
                </Link>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-8 flex justify-center items-center gap-2 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg text-sm border ${
                    currentPage === page
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}