// app/mdx-components.tsx
import Image from "next/image";
import type { MDXComponents } from "mdx/types";

type ImgProps = {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  [key: string]: any;
};

export function useMDXComponents(
  components: MDXComponents
): MDXComponents {
  return {
    // MDX içindeki <img> etiketlerini Next.js <Image> ile değiştiriyoruz
    img: ({ src, alt, width, height, ...rest }: ImgProps) => {
      if (!src) return null; // src yoksa hiç render etme

      return (
        <span className="block my-4">
          <Image
            src={src as string} // TS uyarısını susturmak için
            alt={alt ?? ""}
            width={width ?? 800}
            height={height ?? 450}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 800px"
            className="rounded-lg"
            {...rest}
          />
        </span>
      );
    },
    ...components,
  };
}