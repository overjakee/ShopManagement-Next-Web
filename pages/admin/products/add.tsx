// pages/admin/products/add.tsx
import { useState } from "react";
import { useRouter } from "next/router";

export default function AddProductPage() {
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    detail: "",
    quantity: "",
  });

  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("เพิ่มสินค้า:", form);
    alert("เพิ่มสินค้าเรียบร้อย");
    router.push("/admin/products");
  };

  const handleCancel = () => {
    if (confirm("คุณต้องการยกเลิกการเพิ่มสินค้าหรือไม่?")) {
      router.push("/admin/products");
    }
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

        <div>
          <label className="block font-medium mb-1">รูปภาพสินค้า (URL)</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="เช่น https://example.com/image.jpg"
            className="w-full border border-gray-300 rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">รายละเอียดสินค้า</label>
          <textarea
            name="detail"
            value={form.detail}
            onChange={handleChange}
            rows={3}
            className="w-full border border-gray-300 rounded px-3 py-2"
            placeholder="รายละเอียดสินค้าเพิ่มเติม"
          />
        </div>

        <div>
          <label className="block font-medium mb-1">จำนวนสินค้า (ชิ้น)</label>
          <input
            type="number"
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded px-3 py-2"
            required
          />
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            onClick={handleCancel}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
          >
            ยกเลิก
          </button>

          <button
            type="submit"
            className="ml-2 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            บันทึกสินค้า
          </button>
        </div>
      </form>
    </div>
  );
}
