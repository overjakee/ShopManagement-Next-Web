import { useRouter } from "next/router";
import AdminLayout from "@/components/AdminLayout";
import { useEffect, useState } from "react";

const mockUsers = [
  { id: "1", name: "สมชาย", email: "somchai@example.com", role: "Admin" },
  { id: "2", name: "สุนีย์", email: "sunee@example.com", role: "Customer" },
  { id: "3", name: "John", email: "john@example.com", role: "Customer" },
];

export default function EditUserPage() {
  const router = useRouter();
  const { userId } = router.query;

  const [user, setUser] = useState<{ id: string; name: string; email: string; role: string } | null>(null);

  useEffect(() => {
    if (userId) {
      const foundUser = mockUsers.find((u) => u.id === userId);
      setUser(foundUser ?? null);
    }
  }, [userId]);

  if (!user) return <AdminLayout><p>กำลังโหลด...</p></AdminLayout>;

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-4">แก้ไขผู้ใช้: {user.name}</h1>
      <form className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium">ชื่อ</label>
          <input
            type="text"
            defaultValue={user.name}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">อีเมล</label>
          <input
            type="email"
            defaultValue={user.email}
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">บทบาท</label>
          <select defaultValue={user.role} className="w-full p-2 border rounded">
            <option value="Admin">Admin</option>
            <option value="Customer">Customer</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          บันทึกการเปลี่ยนแปลง
        </button>
      </form>
    </AdminLayout>
  );
}
