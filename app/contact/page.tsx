// app/contact/page.tsx
import ContactForm from "@/components/forms/ContactForm";
import Link from "next/link";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "İletişim",
  description:
    "KW Alesta (Bayraklı – Ege Perla), KW Viya (Çiğli) ve KW Orsa (Urla) ekiplerine ulaşın. Sorularınızı doğru ofise yönlendirelim.",
  alternates: { canonical: "/contact" },
  openGraph: {
    title: "İletişim | KW Alesta • KW Viya • KW Orsa",
    description:
      "İzmir’de üç ofisimizle yanınızdayız. Formu doldurun, sizi doğru ekibe yönlendirelim.",
    url: "/contact",
    images: [
      {
        url: "/og?title=İletişim",
        width: 1200,
        height: 630,
        alt: "İletişim | KW Alesta • KW Viya • KW Orsa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og?title=İletişim"],
  },
};

function ResourceItem({
  title,
  desc,
  href,
  icon,
  external,
}: {
  title: string;
  desc: string;
  href: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  const Cmp = external ? "a" : Link;
  const props = external
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <div className="rounded-2xl border border-black/10 p-4 hover:shadow-sm transition">
      <div className="flex items-start gap-3">
        <span className="mt-1 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-gray-100">
          {icon}
        </span>
        <div className="flex-1">
          <Cmp {...(props as any)} className="font-medium hover:underline">
            {title}
          </Cmp>
          <p className="mt-1 text-sm text-gray-600">{desc}</p>
        </div>
      </div>
    </div>
  );
}

function OfficeCard({
  name,
  area,
  href,
}: {
  name: string;
  area: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="block rounded-2xl border border-black/10 p-4 hover:shadow-sm transition"
    >
      <h3 className="font-medium">{name}</h3>
      <p className="mt-1 text-sm text-gray-600">{area}</p>
      <span className="mt-2 inline-flex items-center gap-1 text-sm text-gray-700">
        Detaylar
        <svg width="14" height="14" viewBox="0 0 24 24" className="opacity-70">
          <path
            d="M9 18l6-6-6-6"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
    </Link>
  );
}

export default function ContactPage() {
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
      <header className="max-w-2xl">
        <p className="text-xs font-medium tracking-wide text-gray-500">
          İLETİŞİM
        </p>
        <h1 className="mt-1 text-3xl font-semibold">
          KW Alesta • KW Viya • KW Orsa ile İletişime Geçin
        </h1>
        <p className="mt-2 text-sm text-gray-600">
          Hangi konuda destek arıyorsun? Formu doldur; seni doğru ofise
          yönlendirelim. İzmir’de üç lokasyonda hizmet veriyoruz.
        </p>
      </header>

      <section className="mt-8 grid gap-6 lg:grid-cols-3">
        {/* Sol: Form */}
        <div className="lg:col-span-2">
          <div className="rounded-3xl border border-black/10 bg-white p-4 sm:p-6">
            <ContactForm />
          </div>
        </div>

        {/* Sağ: Franchise kaynakları ve ofis kutuları */}
        <aside className="space-y-4">
          <h2 className="text-lg font-medium">Hızlı Bağlantılar</h2>

          <ResourceItem
            title="Danışman Ol"
            desc="KWAVO’da girişimcilik kültürü ve üretim odaklı koçlukla büyü."
            href="/contact"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5zm0 0v7" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            }
          />

          <ResourceItem
            title="Ofislerimiz"
            desc="Bayraklı (Ege Perla), Çiğli ve Urla lokasyonlarımız."
            href="/offices"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M12 2l7 6v12H5V8l7-6z" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            }
          />

          <ResourceItem
            title="Basın Odası"
            desc="Bültenler, duyurular ve medya içerikleri."
            href="/press"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M4 6h16M4 12h12M4 18h16" stroke="currentColor" strokeWidth="2" />
              </svg>
            }
          />

          <ResourceItem
            title="Media Kit"
            desc="Logolar ve marka kullanım dosyaları."
            href="/media"
            icon={
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path d="M4 4h16v16H4z" stroke="currentColor" strokeWidth="2" fill="none" />
              </svg>
            }
          />

          <div className="pt-2">
            <h3 className="text-sm font-medium text-gray-500">
              Doğrudan Ofislerimiz
            </h3>
            <div className="mt-2 grid gap-3">
              <OfficeCard
                name="KW Alesta"
                area="Bayraklı – Ege Perla"
                href="/offices#alesta"
              />
              <OfficeCard
                name="KW Viya"
                area="Çiğli"
                href="/offices#viya"
              />
              <OfficeCard
                name="KW Orsa"
                area="Urla"
                href="/offices#orsa"
              />
            </div>
          </div>
        </aside>
      </section>
    </main>
  );
}