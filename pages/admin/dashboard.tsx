// pages/dashboard.tsx
import React from "react";
import Head from "next/head";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import AdminLayout from "@/components/AdminLayout";

const summary = [
  { title: "ยอดขายวันนี้", value: "฿12,500" },
  { title: "ออเดอร์วันนี้", value: "48 รายการ" },
  { title: "ลูกค้าใหม่", value: "7 คน" },
  { title: "สินค้าใกล้หมด", value: "3 รายการ" },
];

const monthlySales = [
  { month: "ม.ค.", total: 24000 },
  { month: "ก.พ.", total: 13980 },
  { month: "มี.ค.", total: 9800 },
  { month: "เม.ย.", total: 20000 },
  { month: "พ.ค.", total: 27800 },
  { month: "มิ.ย.", total: 18900 },
  { month: "ก.ค.", total: 23900 },
];

const salesByCategory = [
  { category: "อิเล็กทรอนิกส์", sales: 12000 },
  { category: "หนังสือ", sales: 8000 },
  { category: "เสื้อผ้า", sales: 9500 },
];

const salesByUserType = [
  { type: "General", value: 15000 },
  { type: "Student", value: 6000 },
  { type: "Teacher", value: 8500 },
];

const latestOrders = [
  {
    id: "ORD001",
    customer: "สมชาย",
    date: "30 ก.ค.",
    total: "฿1,200",
    status: "รอดำเนินการ",
  },
  {
    id: "ORD002",
    customer: "ศิริพร",
    date: "30 ก.ค.",
    total: "฿2,340",
    status: "จัดส่งแล้ว",
  },
  {
    id: "ORD003",
    customer: "ธีรพล",
    date: "29 ก.ค.",
    total: "฿980",
    status: "กำลังแพ็ค",
  },
];

const bestSellers = [
  { name: "iPhone 15", sold: 32, revenue: 512000 },
  { name: "MacBook Air", sold: 20, revenue: 820000 },
  { name: "หนังสือ React", sold: 50, revenue: 25000 },
];

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

export default function Dashboard() {
  return (
    <AdminLayout>
      <div className="p-6 bg-gray-100 min-h-screen">
        <Head>
          <title>Dashboard</title>
        </Head>

        <h1 className="text-3xl font-bold mb-6">แดชบอร์ดร้านค้า</h1>

        {/* Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {summary.map((item, idx) => (
            <div key={idx} className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">{item.title}</p>
              <p className="text-2xl font-bold">{item.value}</p>
            </div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">ยอดขายรายเดือน</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlySales}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="total" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">
              ยอดขายตามประเภทสินค้า
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={salesByCategory}>
                <XAxis dataKey="category" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="sales" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">
              ยอดขายตามประเภทลูกค้า
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={salesByUserType}
                  dataKey="value"
                  nameKey="type"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  label
                >
                  {salesByUserType.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-lg font-semibold mb-2">ออเดอร์ล่าสุด</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="text-left text-gray-600">
                  <th>รหัส</th>
                  <th>ลูกค้า</th>
                  <th>วันที่</th>
                  <th>ยอดรวม</th>
                  <th>สถานะ</th>
                </tr>
              </thead>
              <tbody>
                {latestOrders.map((order, idx) => (
                  <tr key={idx} className="border-t">
                    <td>{order.id}</td>
                    <td>{order.customer}</td>
                    <td>{order.date}</td>
                    <td>{order.total}</td>
                    <td>{order.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Best Sellers */}
        <div className="bg-white p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-2">สินค้าขายดี (Tob 10)</h2>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-left text-gray-600">
                <th>สินค้า</th>
                <th>จำนวนขาย</th>
                <th>รายได้รวม</th>
              </tr>
            </thead>
            <tbody>
              {bestSellers.map((item, idx) => (
                <tr key={idx} className="border-t">
                  <td>{item.name}</td>
                  <td>{item.sold} ชิ้น</td>
                  <td>฿{item.revenue.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
}
