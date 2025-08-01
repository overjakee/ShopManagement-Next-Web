// pages/admin/products/index.tsx
import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { useState } from "react";

const mockProducts = [
  { id: "1", name: "iPhone 14", category: "Phone", price: 29900 },
  { id: "2", name: "MacBook Pro", category: "Laptop", price: 79900 },
  { id: "3", name: "AirPods Pro", category: "Accessory", price: 8990 },
  { id: "4", name: "iPad Pro", category: "Tablet", price: 35900 },
  { id: "5", name: "Apple Watch", category: "Accessory", price: 15900 },
];

export default function ProductListPage() {
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProducts = mockProducts.filter((product) => {
    const matchName = nameFilter === "" || product.name.toLowerCase().includes(nameFilter.toLowerCase());
    const matchCategory = categoryFilter === "" || product.category.toLowerCase().includes(categoryFilter.toLowerCase());
    const matchMin = minPrice === "" || product.price >= Number(minPrice);
    const matchMax = maxPrice === "" || product.price <= Number(maxPrice);
    return matchName && matchCategory && matchMin && matchMax;
  });

  const handleDelete = (name: string) => {
    alert(`ไม่สามารถลบ "${name}" ได้ (Mock เท่านั้น)`);
  };

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">รายการสินค้า</h1>
          <Link href="/admin/products/add">
            <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
              + เพิ่มสินค้า
            </button>
          </Link>
        </div>

        {/* Filter Section */}
        <div className="mb-4 flex flex-wrap gap-4 bg-white p-4 rounded shadow-sm">
          <div>
            <label className="block text-sm font-medium mb-1">ค้นหาชื่อสินค้า</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2"
              value={nameFilter}
              onChange={(e) => setNameFilter(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ประเภทสินค้า</label>
            <input
              type="text"
              className="border border-gray-300 rounded px-3 py-2"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ราคาต่ำสุด</label>
            <input
              type="number"
              className="border border-gray-300 rounded px-3 py-2"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">ราคาสูงสุด</label>
            <input
              type="number"
              className="border border-gray-300 rounded px-3 py-2"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">ชื่อสินค้า</th>
              <th className="py-2 px-4 text-left">ประเภท</th>
              <th className="py-2 px-4 text-right">ราคา</th>
              <th className="py-2 px-4 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr key={product.id} className="border-t">
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4 text-right">
                    {product.price.toLocaleString()} ฿
                  </td>
                  <td className="py-2 px-4 text-center space-x-3">
                    <Link href={`/admin/products/${product.id}`}>
                      <button className="text-blue-600 hover:underline">แก้ไข</button>
                    </Link>
                    <button
                      onClick={() => handleDelete(product.name)}
                      className="text-red-600 hover:underline"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-500">
                  ไม่พบข้อมูลที่ตรงกับเงื่อนไข
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminLayout>
  );
}
