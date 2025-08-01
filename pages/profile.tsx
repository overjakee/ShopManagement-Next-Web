import React from "react";

const ProfilePage = () => {
  const user = {
    username: "jakree123",
    firstName: "จักรี",
    lastName: "ประทีปคีรี",
    email: "jakree@example.com",
    phone: "0812345678",
    address: "123/45 ถนนราชพฤกษ์ แขวงบางระมาด เขตตลิ่งชัน กรุงเทพฯ 10170",
    orders: [
      {
        orderId: "ORD001",
        date: "2025-07-30",
        total: 1200,
        status: "จัดส่งแล้ว",
      },
      {
        orderId: "ORD002",
        date: "2025-07-15",
        total: 880,
        status: "อยู่ระหว่างดำเนินการ",
      },
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">ข้อมูลส่วนตัว</h1>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-500">ชื่อผู้ใช้</label>
            <div className="text-lg font-medium">{user.username}</div>
          </div>
          <div>
            <label className="block text-gray-500">ชื่อ-นามสกุล</label>
            <div className="text-lg font-medium">
              {user.firstName} {user.lastName}
            </div>
          </div>
          <div>
            <label className="block text-gray-500">อีเมล</label>
            <div className="text-lg font-medium">{user.email}</div>
          </div>
          <div>
            <label className="block text-gray-500">เบอร์โทรศัพท์</label>
            <div className="text-lg font-medium">{user.phone}</div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-gray-500">ที่อยู่</label>
            <div className="text-lg font-medium">{user.address}</div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-semibold mb-4">ประวัติการสั่งซื้อ</h2>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full table-auto">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">รหัสคำสั่งซื้อ</th>
              <th className="px-4 py-2 text-left">วันที่</th>
              <th className="px-4 py-2 text-right">ยอดรวม (บาท)</th>
              <th className="px-4 py-2 text-left">สถานะ</th>
            </tr>
          </thead>
          <tbody>
            {user.orders.map((order) => (
              <tr key={order.orderId} className="border-t">
                <td className="px-4 py-2">{order.orderId}</td>
                <td className="px-4 py-2">{order.date}</td>
                <td className="px-4 py-2 text-right">{order.total.toLocaleString()}</td>
                <td className="px-4 py-2">{order.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProfilePage;
