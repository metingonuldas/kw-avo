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
      apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!, // env garanti olsun
      version: "weekly",
    });

    loader.load().then((google) => {
      if (!mapRef.current) return;

      const center = offices[0]?.location ?? { lat: 38.45, lng: 27.2 };

      const map = new google.maps.Map(mapRef.current, {
        center,
        zoom: 10,
        mapId: "KWAVO_MAP",
      });

      offices.forEach((o) => {
        const marker = new google.maps.Marker({
          position: o.location,
          map,
          title: o.name,
        });

        const infowindow = new google.maps.InfoWindow({
          content: `<div style="font-size:14px"><b>${o.name}</b><br/>${o.address}</div>`,
        });

        marker.addListener("click", () => {
          infowindow.open({ anchor: marker, map });
        });
      });
    });
  }, [offices]);

  return (
    <div
      ref={mapRef}
      className="w-full h-[420px] rounded-2xl border border-gray-200"
    />
  );
}