import path from "node:path";
import { fileURLToPath } from "node:url";
import createMDX from "@next/mdx";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  turbopack: {
    root: __dirname,
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
