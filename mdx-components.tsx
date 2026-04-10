/* eslint-disable @next/next/no-img-element */
import type { MDXComponents } from "mdx/types";

const components: MDXComponents = {
  h1: (props) => (
    <h1
      className="font-headline text-5xl font-bold leading-[0.96] tracking-[-0.07em] text-on-surface sm:text-6xl"
      {...props}
    />
  ),
  h2: (props) => (
    <h2
      className="mt-16 font-headline text-3xl font-semibold leading-tight tracking-[-0.05em] text-on-surface sm:text-4xl"
      {...props}
    />
  ),
  h3: (props) => (
    <h3
      className="mt-12 font-headline text-2xl font-semibold leading-tight tracking-[-0.04em] text-on-surface"
      {...props}
    />
  ),
  p: (props) => <p className="text-[1.06rem] leading-8 text-on-surface-variant" {...props} />,
  a: (props) => <a className="text-primary underline decoration-primary/40 underline-offset-4" {...props} />,
  ul: (props) => <ul className="list-disc space-y-3 pl-6 text-[1.06rem] leading-8 text-on-surface-variant" {...props} />,
  ol: (props) => <ol className="list-decimal space-y-3 pl-6 text-[1.06rem] leading-8 text-on-surface-variant" {...props} />,
  li: (props) => <li className="pl-1" {...props} />,
  blockquote: (props) => (
    <blockquote
      className="border-l-[3px] border-primary bg-surface-container-low px-6 py-5 font-headline text-2xl italic leading-relaxed text-on-surface"
      {...props}
    />
  ),
  hr: (props) => <hr className="my-12 border-0 border-t border-outline-variant/35" {...props} />,
  strong: (props) => <strong className="font-semibold text-on-surface" {...props} />,
  code: (props) => (
    <code
      className="rounded-sm bg-surface-container-low px-1.5 py-0.5 font-mono text-[0.92em] text-on-surface"
      {...props}
    />
  ),
  pre: (props) => (
    <pre
      className="my-8 overflow-x-auto bg-surface-container-low px-5 py-4 font-mono text-sm leading-7 text-on-surface"
      {...props}
    />
  ),
  img: (props) => <img className="my-8 w-full bg-surface-container-low object-cover" {...props} alt={props.alt ?? ""} />,
  figure: (props) => <figure className="my-10" {...props} />,
  figcaption: (props) => (
    <figcaption className="mt-3 text-center font-label text-[10px] uppercase tracking-[0.22em] text-outline" {...props} />
  ),
};

export function useMDXComponents(): MDXComponents {
  return components;
}
