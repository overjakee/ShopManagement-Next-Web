import { useState } from "react";
import Link from "next/link";
import AdminLayout from "@/components/AdminLayout";

const mockUsers = Array.from({ length: 25 }, (_, i) => ({
  id: `${i + 1}`,
  name: `ผู้ใช้ที่ ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: i % 2 === 0 ? "Admin" : "Customer",
  status: i % 3 === 0 ? "Inactive" : "Active",
  customerType: i % 3 === 0 ? "Student" : i % 3 === 1 ? "Teacher" : "General",
}));

const ITEMS_PER_PAGE = 10;

export default function UsersPage() {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
    customerType: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  const applyFilters = () => {
    const result = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(filters.name.toLowerCase()) &&
        user.email.toLowerCase().includes(filters.email.toLowerCase()) &&
        (filters.role === "" || user.role === filters.role) &&
        (filters.status === "" || user.status === filters.status) &&
        (filters.customerType === "" ||
          user.customerType === filters.customerType)
    );
    setFilteredUsers(result);
    setCurrentPage(1);
  };

  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  return (
    <AdminLayout>
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">รายการผู้ใช้</h1>

        {/* Filters */}
        <div className="mb-4 flex flex-wrap gap-4 items-end">
          <input
            type="text"
            placeholder="ค้นหาชื่อ"
            className="border p-2 rounded w-48"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
          <input
            type="text"
            placeholder="ค้นหาอีเมล"
            className="border p-2 rounded w-64"
            value={filters.email}
            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
          />
          <select
            className="border p-2 rounded w-40"
            value={filters.role}
            onChange={(e) => setFilters({ ...filters, role: e.target.value })}
          >
            <option value="">บทบาททั้งหมด</option>
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
          </select>
          <select
            className="border p-2 rounded w-40"
            value={filters.status}
            onChange={(e) => setFilters({ ...filters, status: e.target.value })}
          >
            <option value="">สถานะทั้งหมด</option>
            <option value="Active">ใช้งาน</option>
            <option value="Inactive">ไม่ใช้งาน</option>
          </select>
          <select
            className="border p-2 rounded w-40"
            value={filters.customerType}
            onChange={(e) =>
              setFilters({ ...filters, customerType: e.target.value })
            }
          >
            <option value="">ประเภทลูกค้าทั้งหมด</option>
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
            <option value="General">General</option>
          </select>
          <button
            onClick={applyFilters}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            ค้นหา
          </button>
        </div>

        {/* Table */}
        <table className="min-w-full bg-white border border-gray-300 rounded">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 text-left">ชื่อ</th>
              <th className="py-2 px-4 text-left">อีเมล</th>
              <th className="py-2 px-4 text-center">บทบาท</th>
              <th className="py-2 px-4 text-center">สถานะ</th>
              <th className="py-2 px-4 text-center">ประเภทลูกค้า</th>
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
                  <td className="py-2 px-4 text-center">
                    <span
                      className={`px-2 py-1 rounded-full text-sm font-medium ${
                        user.status === "Active"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {user.status === "Active" ? "ใช้งาน" : "ไม่ใช้งาน"}
                    </span>
                  </td>

                  <td className="py-2 px-4 text-center">{user.customerType}</td>
                  <td className="py-2 px-4 text-center">
                    <Link
                      href={`/admin/users/${user.id}`}
                      className="text-blue-600 hover:underline"
                    >
                      แก้ไข
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="py-4 text-center text-gray-500">
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
