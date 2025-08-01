"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react"; // ใช้ icon สวย ๆ

type CartItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "เสื้อยืดสีดำ",
      quantity: 2,
      price: 250,
    },
    {
      id: 2,
      name: "กางเกงยีนส์ชาย",
      quantity: 1,
      price: 790,
    },
  ]);

  const handleRemoveItem = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const total = cartItems.reduce((sum, item) => sum + item.quantity * item.price, 0);

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">ตะกร้าสินค้าของคุณ</h1>

      <div className="bg-white rounded-xl shadow p-6 space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">ไม่มีสินค้าที่เลือกไว้</p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex justify-between items-center border-b pb-3 last:border-none"
            >
              <div>
                <h2 className="text-lg font-semibold">{item.name}</h2>
                <p className="text-sm text-gray-500">จำนวน: {item.quantity}</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right text-lg font-medium text-blue-700">
                  ฿ {item.quantity * item.price}
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="text-red-500 hover:text-red-700 transition"
                  title="ลบสินค้า"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
          <div className="flex justify-between items-center border-t pt-4 text-xl font-bold">
            <span>ราคารวมทั้งหมด</span>
            <span className="text-green-600">฿ {total}</span>
          </div>
        )}
      </div>

      {cartItems.length > 0 && (
        <div className="mt-8 text-center">
          <Link
            href="/checkout"
            className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-xl shadow-md transition"
          >
            ยืนยันการเลือกสินค้า
          </Link>
        </div>
      )}
    </div>
  );
}
