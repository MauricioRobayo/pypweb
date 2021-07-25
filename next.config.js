module.exports = {
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
    ];
  },
};
