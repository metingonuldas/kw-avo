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
  const offices = getAllOffices(); // fs ile okur (server)
  const options = offices.map((o) => ({ value: o.slug, label: o.name }));
  const prefillOffice = searchParams.office ?? "";

  return <ContactForm options={options} prefillOffice={prefillOffice} />;
}