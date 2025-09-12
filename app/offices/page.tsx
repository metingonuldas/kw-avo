import { getAllOffices } from "@/lib/offices";
import OfficeMap from "@/components/OfficeMap";

export const dynamic = "force-static";

export default function OfficesPage() {
  const offices = getAllOffices();
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-semibold">Ofisler</h1>
      <p className="mt-2 text-gray-600 text-sm">İzmir’deki ofislerimiz ve hizmet verdiğimiz bölgeler.</p>

      <div className="mt-8">
        <OfficeMap offices={offices} />
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {offices.map(o => (
          <div key={o.slug} className="rounded-2xl border border-black/10 p-4">
            <h3 className="text-lg font-semibold">{o.name}</h3>
            <p className="text-sm text-gray-600">{o.address}</p>
            {o.areas?.length ? (
              <p className="mt-2 text-sm"><span className="text-gray-500">Bölgeler:</span> {o.areas.join(" • ")}</p>
            ) : null}
          </div>
        ))}
      </div>
    </main>
  );
}