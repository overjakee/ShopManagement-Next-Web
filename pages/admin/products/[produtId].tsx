// pages/admin/products/[productId].tsx
import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// ข้อมูลจำลองที่มี field เพิ่มเติม
const mockProduct = {
  id: "2",
  name: "MacBook Pro",
  category: "Laptop",
  price: 79900,
  image: "https://example.com/macbook.jpg",
  detail: "แล็ปท็อปสำหรับสายงานมืออาชีพ",
  quantity: 10,
  status: "Active",
};

export default function EditProductPage() {
  const router = useRouter();
  const { productId } = router.query;

  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    image: "",
    detail: "",
    quantity: "",
    status: "",
  });

  useEffect(() => {
    // จำลองการโหลดข้อมูล
    if (productId === mockProduct.id) {
      setForm({
        name: mockProduct.name,
        category: mockProduct.category,
        price: mockProduct.price.toString(),
        image: mockProduct.image,
        detail: mockProduct.detail,
        quantity: mockProduct.quantity.toString(),
        status: mockProduct.status,
      });
    }
  }, [productId]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("อัปเดตสินค้า:", form);
    alert("บันทึกการแก้ไขแล้ว");
    router.push("/admin/products");
  };

  const handleCancel = () => {
    if (confirm("คุณต้องการยกเลิกการแก้สินค้าหรือไม่?")) {
      router.push("/admin/products");
    }
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-lg mx-auto">
        <h1 className="text-2xl font-bold mb-4">แก้ไขสินค้า #{productId}</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded shadow"
        >
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
              placeholder="https://example.com/image.jpg"
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

          <div>
            <label className="block font-medium mb-1">สถานะการแสดงสินค้า</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">-- เลือกสถานะ --</option>
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
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
              className="ml-2 bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700"
            >
              อัปเดตสินค้า
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
