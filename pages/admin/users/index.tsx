import { useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";

const mockUsers = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  name: `ผู้ใช้ที่ ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 2 === 0 ? "Admin" : "Customer",
}));

const ITEMS_PER_PAGE = 10;

export default function UsersPage() {
  const [filters, setFilters] = useState({ name: "", email: "", role: "" });
  const [currentPage, setCurrentPage] = useState(1);

  const filteredUsers = mockUsers.filter((user) =>
    user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
    user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
    (filters.role === "" || user.role === filters.role)
  );

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleDelete = (name: string) => {
    alert(`คุณแน่ใจหรือไม่ว่าต้องการลบผู้ใช้: ${name}`);
  };

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">รายการผู้ใช้</h1>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap gap-4">
          <input
            type="text"
            placeholder="ค้นหาชื่อ"
            className="border p-2 rounded w-48"
            value={filters.name}
            onChange={(e) => {
              setFilters({ ...filters, name: e.target.value });
              setCurrentPage(1);
            }}
          />
          <input
            type="text"
            placeholder="ค้นหาอีเมล"
            className="border p-2 rounded w-64"
            value={filters.email}
            onChange={(e) => {
              setFilters({ ...filters, email: e.target.value });
              setCurrentPage(1);
            }}
          />
          <select
            className="border p-2 rounded w-40"
            value={filters.role}
            onChange={(e) => {
              setFilters({ ...filters, role: e.target.value });
              setCurrentPage(1);
            }}
          >
            <option value="">บทบาททั้งหมด</option>
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
          </select>
        </div>

        {/* Table */}
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">ชื่อ</th>
              <th className="py-2 px-4 text-left">อีเมล</th>
              <th className="py-2 px-4 text-center">บทบาท</th>
              <th className="py-2 px-4 text-center">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {paginatedUsers.length > 0 ? (
              paginatedUsers.map((user) => (
                <tr key={user.id} className="border-t">
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.email}</td>
                  <td className="py-2 px-4 text-center">{user.role}</td>
                  <td className="py-2 px-4 text-center space-x-2">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      แก้ไข
                    </Link>
                    <button
                      onClick={() => handleDelete(user.name)}
                      className="text-red-600 hover:underline"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-4 text-center text-gray-500">
                  ไม่พบผู้ใช้ตามที่กรอง
                </td>
              </tr>
            )}
          </tbody>
        </table>

        {/* Pagination */}
        <div className="flex justify-between items-center mt-4">
          <span className="text-sm text-gray-600">
            หน้า {currentPage} จาก {totalPages}
          </span>
          <div className="space-x-2">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              ย้อนกลับ
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-3 py-1 border rounded disabled:opacity-50"
            >
              ถัดไป
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
