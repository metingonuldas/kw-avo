// app/offices/page.tsx
import { getAllOffices } from "@/lib/offices";
import OfficeMap from "@/components/OfficeMap";
import { MapPinned, Phone, MapPin } from "lucide-react";

export const dynamic = "force-static";

export default function OfficesPage() {
  const offices = getAllOffices(); // filtre/arama yok, hepsini göster

  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <header className="mb-6">
        <h1 className="text-2xl font-semibold">Ofislerimiz</h1>
        <p className="mt-2 text-sm text-gray-600">
          İzmir’de üç lokasyonda hizmet veriyoruz: KW Alesta (Ege Perla), KW Viya
          (Çiğli) ve KW Orsa (Urla).
        </p>
      </header>

      {/* Harita */}
      <section className="mb-8">
        <OfficeMap offices={offices} />
      </section>

      {/* Ofis Kartları */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offices.map((o) => (
          <div
            key={o.slug}
            className="rounded-2xl border border-black/10 bg-white p-5"
          >
            <h2 className="text-lg font-medium">{o.name}</h2>

            {/* Adres */}
            <div className="mt-2 flex items-start gap-2 text-sm text-gray-600">
              <MapPin size={16} className="shrink-0 mt-0.5" />
              <span>{o.address}</span>
            </div>

            {/* Telefon */}
            {o.phone && (
              <div className="mt-2 flex items-center gap-2 text-sm text-gray-600">
                <Phone size={16} className="shrink-0" />
                <a
                  href={`tel:${o.phone.replace(/\s+/g, "")}`}
                  className="text-red-600 hover:underline"
                >
                  {o.phone}
                </a>
              </div>
            )}

            {/* Hizmet bölgeleri */}
            <p className="mt-2 text-xs text-gray-500">
              {o.areas.join(", ")}
            </p>

            {/* Yol tarifi butonu */}
            <div className="mt-4">
              <a
                href={`https://www.google.com/maps/dir/?api=1&destination=${
                  o.location?.lat && o.location?.lng
                    ? `${o.location.lat},${o.location.lng}`
                    : encodeURIComponent(o.address)
                }`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium bg-black text-white hover:opacity-90"
              >
                <MapPinned size={16} />
                Yol Tarifi Al
              </a>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}