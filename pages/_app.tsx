// pages/_app.tsx
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import Header from "@/components/Header";
import { useRouter } from "next/router";
import { CartProvider } from "@/contexts/CartContext"; // ✅ import

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  const hideHeaderPages = ["/login", "/register"];
  const isAdminPage = router.pathname.startsWith("/admin");
  const shouldShowHeader = !hideHeaderPages.includes(router.pathname) && !isAdminPage;

  return (
    <CartProvider>
      {shouldShowHeader && <Header />}
      <Component {...pageProps} />
    </CartProvider>
  );
}
