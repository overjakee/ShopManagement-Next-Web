// pages/admin/products/[productId].tsx
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const mockProduct = {
  id: "2",
  name: "MacBook Pro",
  category: "Laptop",
  price: 79900,
};

export default function EditProductPage() {
  const router = useRouter();
  const { productId } = router.query;

  const [form, setForm] = useState({ name: "", category: "", price: "" });

  useEffect(() => {
    // จำลองการโหลดข้อมูล
    if (productId === mockProduct.id) {
      setForm({
        name: mockProduct.name,
        category: mockProduct.category,
        price: mockProduct.price.toString(),
      });
    }
  }, [productId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("อัปเดตสินค้า:", form);
    alert("บันทึกการแก้ไขแล้ว");
    router.push("/admin/products");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">แก้ไขสินค้า #{productId}</h1>
      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-medium mb-1">ชื่อสินค้า</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <div>
          <label className="block font-medium mb-1">ประเภทสินค้า</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          >
            <option value="">-- เลือกประเภท --</option>
            <option value="Phone">Phone</option>
            <option value="Laptop">Laptop</option>
            <option value="Accessory">Accessory</option>
          </select>
        </div>
        <div>
          <label className="block font-medium mb-1">ราคา (บาท)</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
        >
          อัปเดตสินค้า
        </button>
      </form>
    </div>
  );
}
