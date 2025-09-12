import { getAllLeaders } from "@/lib/leaders";
import LeaderCard from "@/components/LeaderCard";

export const dynamic = "force-static";

export default function LeadershipPage() {
  const leaders = getAllLeaders();
  return (
    <main className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
      <h1 className="text-3xl font-semibold">Liderlik</h1>
      <p className="mt-2 text-gray-600 text-sm">
        KW Alesta • Viya • Orsa’yı ileriye taşıyan ekip.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {leaders.map((l) => <LeaderCard key={l.slug} leader={l} />)}
      </div>
    </main>
  );
}