"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function LayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Bu sayfalar "Tam Ekran" modunda çalışacak (Navbar/Footer yok)
  const fullscreenRoutes = ["/yap-bir-randevu"];

  const isFullscreen = fullscreenRoutes.includes(pathname);

  return (
    <>
      {!isFullscreen && <Navbar />}
      <div className={!isFullscreen ? "flex-1" : "flex-1 min-h-screen"}>
        {children}
      </div>
      {!isFullscreen && <Footer />}
    </>
  );
}