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
        changefreq: config.changefreq,
        priority: 0.85,
        lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      };
    }
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: config.priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
