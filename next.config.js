module.exports = {
  async redirects() {
    return [
      {
        destination: "/:city/:category/:number",
        permanent: true,
        source: "/:city/:category/placa/:number",
      },
    ];
  },
};
