// components/AdminLayout.tsx
import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4 flex flex-col" style={{ height: '100vh' }}>
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        
        {/* กลับหน้าหลัก */}
        <Link href="/shoppage" className="block text-sm text-gray-300 hover:text-white hover:underline mb-4">
          ← กลับหน้าร้าน
        </Link>

        <nav className="space-y-2 flex-1 overflow-y-auto">
          <Link href="/admin/dashboard" className="block hover:text-yellow-400">Dashboard</Link>
          <Link href="/admin/products" className="block hover:text-yellow-400">Products</Link>
          <Link href="/admin/orders" className="block hover:text-yellow-400">Orders</Link>
          <Link href="/admin/users" className="block hover:text-yellow-400">Users</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6 overflow-y-auto" style={{ height: '100vh' }}>
        {children}
      </main>
    </div>
  );
}
