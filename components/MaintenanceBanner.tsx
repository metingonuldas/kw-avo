"use client";
import { useEffect, useState } from "react";

export default function MaintenanceBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Public env ile bakım açık mı?
    const on = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "on";
    // Bypass cookie’si var mı (client tarafında basit kontrol)
    const hasBypass = document.cookie.includes("mw_bypass=1");
    setShow(on && hasBypass);
  }, []);

  if (!show) return null;

  return (
    <div className="w-full bg-amber-100 text-amber-900 text-xs text-center py-2">
      Bakım modu açık — bu bildirimi yalnızca yetkili erişim ile görüyorsunuz.
    </div>
  );
}