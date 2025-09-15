import { getAllOffices } from "@/lib/offices";
import ContactForm from "@/components/forms/ContactForm";

export const metadata = {
  title: "İletişim | KW Alesta • KW Viya • KW Orsa",
  description: "Danışman olmak veya randevu almak için bizimle iletişime geçin.",
};

export default function ContactPage({
  searchParams,
}: {
  searchParams: { office?: string };
}) {
  const offices = getAllOffices(); // server'da çalışır (fs kullanıyor)
  const options = offices.map((o) => ({
    value: o.slug,
    label: o.name, // istersen `${o.name} — ${o.address}` yap
  }));

  return (
    <ContactForm
      prefillOffice={searchParams.office ?? ""}
      options={options}
    />
  );
}