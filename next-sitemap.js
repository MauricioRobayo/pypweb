module.exports = {
  siteUrl: "https://www.pyphoy.com",
  generateRobotsTxt: true,
  transform: async (config, path) => {
    console.log(config);
    if (path === "/") {
      return {
        loc: path,
        changefreq: "yearly",
        priority: 1,
      };
    }
    if ([2, 3].includes(path.split("/").length)) {
      return {
        loc: path,
        changefreq: "daily",
        priority: 0.8,
        lastmod: new Date().toISOString(),
      };
    }
    return {
      loc: path,
      changefreq: "daily",
      priority: 0.6,
      lastmod: new Date().toISOString(),
    };
  },
};
