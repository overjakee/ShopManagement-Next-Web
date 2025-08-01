// components/AdminLayout.tsx
import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-gray-800 text-white p-4 space-y-4">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
        <nav className="space-y-2">
          <Link href="/admin/dashboard" className="block hover:text-yellow-400">Dashboard</Link>
          <Link href="/admin/products" className="block hover:text-yellow-400">Products</Link>
          <Link href="/admin/orders" className="block hover:text-yellow-400">Orders</Link>
          <Link href="/admin/users" className="block hover:text-yellow-400">Users</Link>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 bg-gray-100 p-6">{children}</main>
    </div>
  );
}
