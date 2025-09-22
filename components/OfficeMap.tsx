"use client";
import { useEffect, useRef } from "react";
import type { Office } from "@/lib/offices";
import { Loader } from "@googlemaps/js-api-loader";

export default function OfficeMap({ offices }: { offices: Office[] }) {
  const mapRef = useRef<HTMLDivElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
      version: "weekly",
    });

    loader.load().then(() => {
      // @ts-ignore
      const gmaps = (window as any).google?.maps;
      if (!mapRef.current || !gmaps) return;

      // İzmir genel bir fallback merkez (gerekirse)
      const fallback = { lat: 38.42, lng: 27.14 };
      const map = new gmaps.Map(mapRef.current, {
        center: fallback,
        zoom: 10,
        mapId: "KWAVO_MAP",
      });

      const bounds = new gmaps.LatLngBounds();
      offices.forEach((o) => {
        if (!o?.location || typeof o.location.lat !== "number" || typeof o.location.lng !== "number") {
          return;
        }
        const pos = { lat: o.location.lat, lng: o.location.lng };
        const marker = new gmaps.Marker({ position: pos, map, title: o.name });
        const infowindow = new gmaps.InfoWindow({
          content: `<div style="font-size:14px"><b>${o.name}</b><br/>${o.address || ""}</div>`,
        });
        marker.addListener("click", () => infowindow.open({ anchor: marker, map }));
        bounds.extend(pos);
      });

      if (!bounds.isEmpty()) {
        map.fitBounds(bounds);
        // Tek nokta varsa çok fazla zoom’lamasın diye küçük bir ayar
        const listener = gmaps.event.addListenerOnce(map, "bounds_changed", () => {
          if (map.getZoom() > 15) map.setZoom(14);
        });
        // cleanup: (opsiyonel) gerekirse listener kaldır
        setTimeout(() => gmaps.event.removeListener(listener), 1000);
      }
    });
  }, [offices]);

  return <div ref={mapRef} className="w-full h-[420px] rounded-2xl border border-gray-200" />;
}