module.exports = {
  future: {
    webpack5: true,
  },
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
