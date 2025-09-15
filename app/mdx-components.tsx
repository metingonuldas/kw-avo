// app/mdx-components.tsx
import type { MDXComponents } from "mdx/types";
import Image from "next/image";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // MDX içindeki <img> -> next/image
    img: (props: any) => {
      const { src = "", alt = "", width = 800, height = 600, ...rest } = props;
      return (
        <span className="block relative my-4">
          <Image
            src={src}
            alt={alt}
            width={Number(width)}
            height={Number(height)}
            loading="lazy"
            decoding="async"
            sizes="(max-width: 768px) 100vw, 800px"
            {...rest}
          />
        </span>
      );
    },
    ...components,
  };
}