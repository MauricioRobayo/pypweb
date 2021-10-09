module.exports = {
  async redirects() {
    return [
      {
        source: "/:city/:category/placa/:number",
        permanent: true,
        destination: "/:city/:category/:number",
      },
      {
        source: "/popayan/transporte-de-carga",
        permanent: true,
        destination: "/popayan/transporte-de-carga-menor-a-1.500kg",
      },
      {
        source: "/lorica",
        permanent: true,
        destination: "/santa-cruz-de-lorica",
      },
      {
        source: "/lorica/:category",
        permanent: true,
        destination: "/santa-cruz-de-lorica/:category",
      },
      {
        source: "/lorica/:category/:number",
        permanent: true,
        destination: "/santa-cruz-de-lorica/:category/:number",
      },
      {
        source: "/popayan/transporte-de-carga-menor-a-1.500kg",
        permanent: true,
        destination: "/popayan/transporte-de-carga-menor-a-1500kg",
      },
      {
        source: "/bogota/carga-peso-max.-superior-a-8.500kg",
        permanent: true,
        destination: "/bogota/carga-peso-max-superior-a-8500kg",
      },
      {
        source: "/bogota/carga-peso-max.-superior-a-3.500kg",
        permanent: true,
        destination: "/bogota/carga-peso-max-superior-a-3500kg",
      },
      {
        source: "/popayan/transporte-de-carga-menor-a-1.500kg/:number*",
        permanent: true,
        destination: "/popayan/transporte-de-carga-menor-a-1500kg/:number*",
      },
      {
        source: "/bogota/carga-peso-max.-superior-a-8.500kg/:number*",
        permanent: true,
        destination: "/bogota/carga-peso-max-superior-a-8500kg/:number*",
      },
      {
        source: "/bogota/carga-peso-max.-superior-a-3.500kg/:number*",
        permanent: true,
        destination: "/bogota/carga-peso-max-superior-a-3500kg/:number*",
      },
    ];
  },
};
