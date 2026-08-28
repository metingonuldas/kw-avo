import type { ComponentPropsWithoutRef, ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import { slugifyHeading } from "@/lib/blog";

function textFromNode(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textFromNode).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textFromNode((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

function SmartLink({ href = "", children, ...props }: ComponentPropsWithoutRef<"a">) {
  const className = "font-semibold text-brand underline decoration-brand/25 underline-offset-4 transition hover:decoration-brand";
  if (href.startsWith("/")) return <Link href={href} className={className}>{children}</Link>;
  return <a href={href} className={className} target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
}

const components = {
  h2: ({ children }: ComponentPropsWithoutRef<"h2">) => {
    const id = slugifyHeading(textFromNode(children));
    return <h2 id={id} className="scroll-mt-24 pt-5 text-2xl font-semibold leading-tight tracking-[-0.03em] text-neutral-950 sm:text-3xl">{children}</h2>;
  },
  h3: ({ children }: ComponentPropsWithoutRef<"h3">) => {
    const id = slugifyHeading(textFromNode(children));
    return <h3 id={id} className="scroll-mt-24 pt-3 text-xl font-semibold tracking-[-0.02em] text-neutral-950">{children}</h3>;
  },
  p: ({ children }: ComponentPropsWithoutRef<"p">) => <p className="break-words text-[1.04rem] leading-8 text-neutral-700">{children}</p>,
  a: SmartLink,
  strong: ({ children }: ComponentPropsWithoutRef<"strong">) => <strong className="font-semibold text-neutral-950">{children}</strong>,
  ul: ({ children }: ComponentPropsWithoutRef<"ul">) => <ul className="ml-5 list-disc space-y-2 text-[1.04rem] leading-8 text-neutral-700 marker:text-brand">{children}</ul>,
  ol: ({ children }: ComponentPropsWithoutRef<"ol">) => <ol className="ml-5 list-decimal space-y-2 text-[1.04rem] leading-8 text-neutral-700 marker:font-semibold marker:text-brand">{children}</ol>,
  blockquote: ({ children }: ComponentPropsWithoutRef<"blockquote">) => <blockquote className="rounded-r-2xl border-l-4 border-brand bg-brand-light px-5 py-4 text-lg leading-8 text-neutral-800 sm:px-6">{children}</blockquote>,
  hr: () => <hr className="border-black/10" />,
  img: ({ src, alt }: ComponentPropsWithoutRef<"img">) => {
    if (typeof src !== "string") return null;
    return <Image src={src} alt={alt ?? ""} width={1200} height={675} className="h-auto w-full rounded-2xl" />;
  },
  table: ({ children }: ComponentPropsWithoutRef<"table">) => <div className="overflow-x-auto rounded-2xl border border-black/10"><table className="w-full border-collapse text-left text-sm">{children}</table></div>,
  th: ({ children }: ComponentPropsWithoutRef<"th">) => <th className="border-b border-black/10 bg-neutral-100 px-4 py-3 font-semibold text-neutral-900">{children}</th>,
  td: ({ children }: ComponentPropsWithoutRef<"td">) => <td className="border-b border-black/5 px-4 py-3 text-neutral-700">{children}</td>,
};

export default function ArticleBody({ source }: { source: string }) {
  return (
    <div className="space-y-6">
      <MDXRemote source={source} components={components} options={{ mdxOptions: { remarkPlugins: [remarkGfm] } }} />
    </div>
  );
}
