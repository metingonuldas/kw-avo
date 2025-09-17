import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/projects/${project.slug}`}
      className="block rounded-2xl border border-black/10 overflow-hidden hover:shadow-md transition"
    >
      {/* Kare görsel */}
      <div className="relative aspect-square bg-gray-100">
        <Image
          src={project.hero}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>

      {/* Başlık ve detay */}
      <div className="p-4">
        <h3 className="font-medium">{project.title}</h3>
        <p className="text-xs text-gray-500 mt-1">
          {[project.city, project.country].filter(Boolean).join(", ")}
        </p>
      </div>
    </Link>
  );
}