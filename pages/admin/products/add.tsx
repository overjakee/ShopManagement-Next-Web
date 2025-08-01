// pages/admin/products/add.tsx
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddProductPage() {
  const [form, setForm] = useState({ name: "", category: "", price: "" });
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("เพิ่มสินค้า:", form);
    // จำลองว่าเพิ่มเสร็จ
    alert("เพิ่มสินค้าเรียบร้อย");
    router.push("/admin/products");
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">เพิ่มสินค้าใหม่</h1>
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
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          บันทึกสินค้า
        </button>
      </form>
    </div>
  );
}
