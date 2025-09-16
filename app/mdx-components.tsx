import Link from "next/link";
import type { MDXComponents } from "mdx/types";
import type {
  AnchorHTMLAttributes,
  DetailedHTMLProps,
} from "react";

type AnchorProps = DetailedHTMLProps<
  AnchorHTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

/**
 * MDX içinde <a> etiketlerini işler:
 *  - Dahili linkler ("/" ile başlayanlar) -> <Link>
 *  - Harici linkler -> normal <a>
 */
export function useMDXComponents(
  components: MDXComponents
): MDXComponents {
  return {
    a: (props: AnchorProps) => {
      const href = props.href ?? "#";
      if (href.startsWith("/")) {
        const { href: _href, ...rest } = props;
        // rest'in içinde className vb. kalsın
        return <Link href={href} {...(rest as Omit<AnchorProps, "href">)} />;
      }
      return <a {...props} />;
    },
    ...components,
  };
}