// components/Header.tsx
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa";

const Header = () => {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);

  const hideCartPages = ["/login", "/register"];
  const showCart = !hideCartPages.includes(router.pathname);
  const showGotoShop = router.pathname !== "/shoppage";

  // mock user (ในของจริงให้ใช้ context หรือ auth)
  const user = {
    isLoggedIn: true,
    isAdmin: true,
  };

  return (
   <header className="p-4 border-b flex justify-between items-center max-w-screen-xl mx-auto relative">
        {/* ปุ่มกลับหน้าร้าน (แสดงถ้าไม่ใช่หน้า /shoppage) */}
        {showGotoShop ? (
          <Link
            href="/shoppage"
            className="text-lg font-semibold text-blue-600 hover:underline"
          >
            ← กลับหน้าร้าน
          </Link>
        ) : (
          <div /> // ช่องว่างรักษา layout ซ้าย-ขวา
        )}

        {/* ด้านขวา: ตะกร้า + เมนูผู้ใช้ */}
        <div className="flex items-center gap-6">
          {showCart && (
            <Link
              href="/cart"
              className="text-3xl text-gray-700 hover:text-blue-600 transition"
            >
              <FaShoppingCart />
            </Link>
          )}

          {user.isLoggedIn && (
            <div className="relative">
              <button
                onClick={() => setShowMenu((prev) => !prev)}
                onBlur={() => setTimeout(() => setShowMenu(false), 150)}
                className="text-3xl text-gray-700 hover:text-blue-600 transition"
              >
                <FaUserCircle />
              </button>

              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
                  <Link
                    href="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    ประวัติลูกค้า
                  </Link>
                  {user.isAdmin && (
                    <Link
                      href="/admin/dashboard"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      // TODO: handle logout
                      alert("Logged out");
                      router.push("/login");
                    }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    ออกจากระบบ
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </header>
  );
};

export default Header;
