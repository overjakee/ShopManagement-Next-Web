import AdminLayout from "@/components/AdminLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

// mock order data
const mockOrder = {
  id: "1234",
  status: "Pending",
  shippingAddress: "123/45 หมู่ 6 ถนนสุขุมวิท, เขตพระโขนง, กรุงเทพมหานคร",
};

export default function EditOrderPage() {
  const router = useRouter();
  const { orderId } = router.query;

  const [form, setForm] = useState({
    status: "",
    shippingAddress: "",
  });

  useEffect(() => {
    // จำลองโหลด order จาก id
    if (orderId === mockOrder.id) {
      setForm({
        status: mockOrder.status,
        shippingAddress: mockOrder.shippingAddress,
      });
    }
  }, [orderId]);

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (form.status === "Cancelled") {
      const confirmCancel = confirm(
        "หากคุณเปลี่ยนสถานะเป็น 'ยกเลิก' จะไม่สามารถเปลี่ยนกลับได้อีก ต้องการดำเนินการต่อหรือไม่?"
      );
      if (!confirmCancel) return;
    }

    console.log("อัปเดตคำสั่งซื้อ:", form);
    alert("บันทึกการแก้ไขแล้ว");
    router.push("/admin/orders");
  };

  return (
    <AdminLayout>
      <div className="p-6 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">แก้ไขคำสั่งซื้อ #{orderId}</h1>
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded shadow"
        >
          <div>
            <label className="block font-medium mb-1">สถานะคำสั่งซื้อ</label>
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="">-- เลือกสถานะ --</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>

          <div>
            <label className="block font-medium mb-1">ที่อยู่จัดส่ง</label>
            <textarea
              name="shippingAddress"
              value={form.shippingAddress}
              onChange={handleChange}
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => router.push("/admin/orders")}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
            >
              ยกเลิก
            </button>
            <button
              type="submit"
              className="ml-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              บันทึกการเปลี่ยนแปลง
            </button>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
