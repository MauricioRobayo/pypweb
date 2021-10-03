const withPWA = require("next-pwa");

const nextConfig = {
  async redirects() {
    return [
      {
        destination: "/:city/:category/:number",
        permanent: true,
        source: "/:city/:category/placa/:number",
      },
      {
        destination: "/popayan/transporte-de-carga-menor-a-1.500kg",
        permanent: true,
        source: "/popayan/transporte-de-carga",
      },
      {
        destination: "/santa-cruz-de-lorica",
        permanent: true,
        source: "/lorica",
      },
      {
        destination: "/santa-cruz-de-lorica/:category",
        permanent: true,
        source: "/lorica/:category",
      },
      {
        destination: "/santa-cruz-de-lorica/:category/:number",
        permanent: true,
        source: "/lorica/:category/:number",
      },
    ];
  },
};
module.exports = withPWA({
  ...nextConfig,
  pwa: {
    dest: "public",
  },
});
