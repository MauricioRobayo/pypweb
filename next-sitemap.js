module.exports = {
  siteUrl: "https://www.pyphoy.com",
  generateRobotsTxt: true,
  transform: async (config, path) => {
    if (path === "/") {
      return {
        loc: path,
        changefreq: "yearly",
        priority: 1,
      };
    }
    if (path.split("/").length === 2) {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    if (path.split("/").length === 3) {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.9,
        lastmod: new Date().toISOString(),
      };
    }
    return {
      loc: path,
      changefreq: "daily",
      priority: 0.7,
      lastmod: new Date().toISOString(),
    };
  },
};
