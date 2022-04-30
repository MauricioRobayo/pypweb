/** @type {import('next').NextConfig} */

const nextConfig = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      {
        source: "/:city/:category/placa/:number*",
        destination: "/:city/:category/:number*",
        permanent: true,
      },
      {
        source: "/lorica/:category*",
        destination: "/santa-cruz-de-lorica/:category*",
        permanent: true,
      },
      {
        source: "/popayan/transporte-de-carga/:number*",
        destination: "/popayan/transporte-de-carga-menor-a-1500kg/:number*",
        permanent: true,
      },
      {
        source: "/popayan/transporte-de-carga-menor-a-1.500kg/:number*",
        destination: "/popayan/transporte-de-carga-menor-a-1500kg/:number*",
        permanent: true,
      },
      {
        source: "/bogota/carga-peso-max.-superior-a-8.500kg/:number*",
        destination: "/bogota/carga-peso-max-superior-a-8500kg/:number*",
        permanent: true,
      },
      {
        source: "/bogota/carga-peso-max.-superior-a-3.500kg/:number*",
        destination: "/bogota/carga-peso-max-superior-a-3500kg/:number*",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
