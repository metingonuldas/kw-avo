import Image from "next/image";
import Link from "next/link";
import type { Leader } from "@/lib/leaders";

export default function LeaderCard({ leader }: { leader: Leader }) {
  return (
    <div className="rounded-2xl border border-black/10 overflow-hidden hover:shadow-sm transition">
      <div className="relative aspect-square bg-gray-100">
        {leader.photo ? <Image src={leader.photo} alt={leader.name} fill className="object-cover" /> : null}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{leader.name}</h3>
        <p className="text-sm text-gray-600">{leader.title}</p>
        <div className="mt-3 flex items-center gap-3">
          {leader.linkedin ? (
            <Link href={leader.linkedin} className="text-sm underline underline-offset-4 hover:opacity-80" target="_blank">
              LinkedIn
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}