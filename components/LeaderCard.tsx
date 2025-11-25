import Image from "next/image";
import Link from "next/link";
import type { Leader } from "@/lib/leaders";
import {
  Linkedin,
  Instagram,
  Twitter,
  Facebook,
  Globe,
  Mail,
  Phone,
  type LucideIcon,
} from "lucide-react";

// Sosyal satır öğesi tipi
type SocialKey =
  | "linkedin"
  | "instagram"
  | "twitter"
  | "facebook"
  | "website"
  | "email"
  | "phone";

type SocialItem = {
  key: SocialKey;
  label: string;
  icon: LucideIcon;
  prefix?: string; // mailto:/tel: gibi
};

// Chip eşlemesi
const SOCIAL_SCHEME = [
  { key: "linkedin",  label: "LinkedIn",  icon: Linkedin },
  { key: "instagram", label: "Instagram", icon: Instagram },
  { key: "twitter",   label: "X",         icon: Twitter },
  { key: "facebook",  label: "Facebook",  icon: Facebook },
  { key: "website",   label: "Web",       icon: Globe },
  { key: "email",     label: "E-posta",   icon: Mail,  prefix: "mailto:" },
  { key: "phone",     label: "Telefon",   icon: Phone, prefix: "tel:" },
] satisfies ReadonlyArray<SocialItem>;

export default function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <div className="rounded-2xl border border-black/10 bg-white overflow-hidden transition hover:shadow-md">
      {/* Görsel */}
      <div className="relative aspect-square bg-gray-100">
        {leader.photo ? (
          <Image
            src={leader.photo}
            alt={leader.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : null}
      </div>

      {/* İçerik */}
      <div className="p-5">
        <h3 className="text-xl font-semibold tracking-tight">{leader.name}</h3>
        <p className="mt-1 text-sm text-neutral-600">{leader.title}</p>

        {/* Sosyal chip’ler */}
        <div className="mt-4 flex flex-wrap gap-2.5">
          {SOCIAL_SCHEME.map((s) => {
            const value = leader[s.key as keyof Leader] as string | undefined;
            if (!value) return null;

            const href = s.prefix ? `${s.prefix}${value}` : value;
            const Icon = s.icon;

            return (
              <Link
                key={s.key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${leader.name} • ${s.label}`}
                className="
                  inline-flex items-center gap-2 rounded-full
                  border border-black/10 bg-white/90 px-3 py-1.5 text-sm
                  shadow-sm backdrop-blur
                  transition
                  hover:bg-red-600 hover:text-white hover:border-red-600
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-black/30
                "
              >
                <Icon className="h-4 w-4" />
                <span className="font-medium">{s.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}