import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import { useRouter } from "next/router";

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  // ระบุ path ที่ไม่ต้องการให้ Header แสดง
  const hideHeaderPages = ["/login", "/register"];
  const isAdminPage = router.pathname.startsWith("/admin");
  const shouldShowHeader = !hideHeaderPages.includes(router.pathname) && !isAdminPage;

  return (
    <>
      {shouldShowHeader && <Header />}
      <Component {...pageProps} />
    </>
  );
}
