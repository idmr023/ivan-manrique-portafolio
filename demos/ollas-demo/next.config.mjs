/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: "/projects/demos/ollas-demo",
  trailingSlash: true,
  images: { unoptimized: true },
};

export default nextConfig;
