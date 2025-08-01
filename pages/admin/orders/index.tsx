// pages/admin/orders/index.tsx
import AdminLayout from "@/components/AdminLayout";
import { useState } from "react";

const mockOrders = [
  {
    id: "A1001",
    customerName: "สมชาย",
    total: 19900,
    status: "จัดส่งแล้ว",
    createdAt: "2025-07-31",
  },
  {
    id: "A1002",
    customerName: "สุนีย์",
    total: 4900,
    status: "รอดำเนินการ",
    createdAt: "2025-07-30",
  },
  {
    id: "A1003",
    customerName: "John",
    total: 8900,
    status: "ยกเลิก",
    createdAt: "2025-07-20",
  },
  // เพิ่ม mock เพิ่มเติมหากต้องการทดสอบ pagination
];

export default function OrdersPage() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredOrders = mockOrders.filter((order) => {
    const orderDate = new Date(order.createdAt);
    const start = startDate ? new Date(startDate) : null;
    const end = endDate ? new Date(endDate) : null;

    if (start && orderDate < start) return false;
    if (end && orderDate > end) return false;
    if (statusFilter && order.status !== statusFilter) return false;
    return true;
  });

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const resetFilters = () => {
    setStartDate("");
    setEndDate("");
    setStatusFilter("");
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">รายการคำสั่งซื้อ</h1>

        {/* Filter Section */}
        <div className="mb-4 flex flex-wrap items-end gap-4 bg-white p-4 rounded shadow-sm">
          <div>
            <label className="block text-sm font-medium mb-1">วันที่เริ่มต้น</label>
            <input
              type="date"
              className="border border-gray-300 rounded px-3 py-2"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">วันที่สิ้นสุด</label>
            <input
              type="date"
              className="border border-gray-300 rounded px-3 py-2"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">สถานะ</label>
            <select
              className="border border-gray-300 rounded px-3 py-2"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="">-- ทุกสถานะ --</option>
              <option value="จัดส่งแล้ว">จัดส่งแล้ว</option>
              <option value="รอดำเนินการ">รอดำเนินการ</option>
              <option value="ยกเลิก">ยกเลิก</option>
            </select>
          </div>

          <button
            onClick={resetFilters}
            className="ml-auto bg-gray-200 hover:bg-gray-300 text-sm px-4 py-2 rounded"
          >
            ล้างการกรอง
          </button>
        </div>

        {/* Table */}
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">หมายเลขคำสั่งซื้อ</th>
              <th className="py-2 px-4 text-left">ชื่อลูกค้า</th>
              <th className="py-2 px-4 text-right">ยอดรวม (บาท)</th>
              <th className="py-2 px-4 text-center">สถานะ</th>
              <th className="py-2 px-4 text-center">วันที่</th>
              <th className="py-2 px-4 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length > 0 ? (
              paginatedOrders.map((order) => (
                <tr key={order.id} className="border-t">
                  <td className="py-2 px-4">{order.id}</td>
                  <td className="py-2 px-4">{order.customerName}</td>
                  <td className="py-2 px-4 text-right">{order.total.toLocaleString()}</td>
                  <td className="py-2 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded text-white text-sm ${
                        order.status === "จัดส่งแล้ว"
                          ? "bg-green-600"
                          : order.status === "ยกเลิก"
                          ? "bg-red-500"
                          : "bg-yellow-500"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-center">{order.createdAt}</td>
                  <td className="py-2 px-4 text-center">
                    <button className="text-blue-600 hover:underline mr-3">ดูรายละเอียด</button>
                    <button className="text-red-600 hover:underline">ยกเลิก</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="text-center py-4 text-gray-500">
                  ไม่พบข้อมูลที่ตรงกับเงื่อนไข
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              ก่อนหน้า
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                className={`px-3 py-1 border rounded ${
                  currentPage === i + 1 ? "bg-gray-300" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              ถัดไป
            </button>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
