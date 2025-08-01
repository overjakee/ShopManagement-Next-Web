"use client";

import { useState } from "react";

export default function CheckoutPage() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    zip: "",
    note: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: ส่งข้อมูลไป backend
    console.log("ข้อมูลที่อยู่ที่ส่ง:", form);
    alert("ยืนยันคำสั่งซื้อเรียบร้อย!");
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6 text-center">กรอกข้อมูลที่อยู่จัดส่ง</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">ชื่อ-นามสกุล</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">เบอร์โทรศัพท์</label>
          <input
            type="tel"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">ที่อยู่</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            required
            rows={3}
            className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">รหัสไปรษณีย์</label>
          <input
            type="text"
            name="zip"
            value={form.zip}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">หมายเหตุเพิ่มเติม (ถ้ามี)</label>
          <textarea
            name="note"
            value={form.note}
            onChange={handleChange}
            rows={2}
            className="w-full px-4 py-2 border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white text-lg py-3 rounded-lg font-semibold transition"
        >
          ยืนยันการสั่งซื้อ
        </button>
      </form>
    </div>
  );
}
