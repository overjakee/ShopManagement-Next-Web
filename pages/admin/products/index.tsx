// pages/admin/products/index.tsx
import AdminLayout from "@/components/AdminLayout";
import Link from "next/link";
import { useState } from "react";

const mockProducts = [
  { id: "1", name: "iPhone 14", category: "Phone", price: 29900, status: "Active" },
  { id: "2", name: "MacBook Pro", category: "Laptop", price: 79900, status: "Inactive" },
  { id: "3", name: "AirPods Pro", category: "Accessory", price: 8990, status: "Active" },
  { id: "4", name: "iPad Pro", category: "Tablet", price: 35900, status: "Active" },
  { id: "5", name: "Apple Watch", category: "Accessory", price: 15900, status: "Inactive" },
];

export default function ProductListPage() {
  const [nameFilter, setNameFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [filteredProducts, setFilteredProducts] = useState(mockProducts);

  const handleSearch = () => {
    const filtered = mockProducts.filter((product) => {
      const matchName =
        nameFilter === "" || product.name.toLowerCase().includes(nameFilter.toLowerCase());
      const matchCategory =
        categoryFilter === "" ||
        product.category.toLowerCase().includes(categoryFilter.toLowerCase());
      const matchMin = minPrice === "" || product.price >= Number(minPrice);
      const matchMax = maxPrice === "" || product.price <= Number(maxPrice);
      const matchStatus = statusFilter === "" || product.status === statusFilter;

      return matchName && matchCategory && matchMin && matchMax && matchStatus;
    });

    setFilteredProducts(filtered);
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
        <div className="mb-4 flex flex-wrap gap-4 bg-white p-4 rounded shadow-sm items-end">
          <div>
            <label className="block text-sm font-medium mb-1">ชื่อสินค้า</label>
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

          <div>
            <label className="block text-sm font-medium mb-1">สถานะ</label>
            <select
              className="border border-gray-300 rounded px-3 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">-- ทั้งหมด --</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>

          <div>
            <button
              onClick={handleSearch}
              className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-gray-900"
            >
              ค้นหา
            </button>
          </div>
        </div>

        {/* Table */}
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">ชื่อสินค้า</th>
              <th className="py-2 px-4 text-left">ประเภท</th>
              <th className="py-2 px-4 text-right">ราคา</th>
              <th className="py-2 px-4 text-center">สถานะ</th>
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
                  <td className="py-2 px-4 text-center">
                    <span
                      className={`inline-block px-2 py-1 text-sm rounded-full ${
                        product.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center">
                    <Link href={`/admin/products/${product.id}`}>
                      <button className="text-blue-600 hover:underline">แก้ไข</button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-4 text-gray-500">
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
