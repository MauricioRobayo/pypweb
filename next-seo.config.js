export const siteName = "PYPHOY";
export const baseTitle = "Pico y placa";
export const baseDescription =
  "Horario, días, fechas, números, decretos, sanciones y toda la información del pico y placa";
export const defaultConfig = {
  additionalLinkTags: [
    {
      rel: "apple-touch-icon",
      sizes: "57x57",
      href: "/icons/apple-icon-57x57.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "60x60",
      href: "/icons/apple-icon-60x60.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "72x72",
      href: "/icons/apple-icon-72x72.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "76x76",
      href: "/icons/apple-icon-76x76.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "114x114",
      href: "/icons/apple-icon-114x114.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      href: "/icons/apple-icon-120x120.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "144x144",
      href: "/icons/apple-icon-144x144.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "152x152",
      href: "/icons/apple-icon-152x152.png",
    },
    {
      rel: "apple-touch-icon",
      sizes: "180x180",
      href: "/icons/apple-icon-180x180.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      href: "/icons/favicon-16x16.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      href: "/icons/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "96x96",
      href: "/icons/favicon-96x96.png",
    },
    {
      href: "/icons/favicon.ico",
      rel: "icon",
    },
    {
      href: "/manifest.json",
      rel: "manifest",
    },
    {
      href: "/icons/safari-pinned-tab.svg",
      rel: "mask-icon",
    },
    {
      color: "#f7c100",
      href: "/icons/safari-pinned-tab.svg",
      rel: "mask-icon",
    },
  ],
  additionalMetaTags: [
    { name: "msapplication-TileImage", content: "/icons/ms-icon-144x144.png" },
    { name: "msapplication-TileColor", content: "#f7c100" },
    { name: "theme-color", content: "#f7c100" },
  ],
  defaultTitle: `${baseTitle} en Colombia | ${siteName}`,
  description: `${baseDescription} en Colombia`,
  openGraph: {
    images: [
      {
        alt: baseTitle,
        height: 512,
        url: "https://www.pyphoy.com/android-chrome-512x512.png",
        width: 512,
      },
    ],
    locale: "es_CO",
    site_name: siteName,
    type: "website",
    updated_time: `${new Date().toISOString().slice(0, 10)}T00:00:00.000-05:00`,
  },
  titleTemplate: `%s | ${siteName}`,
};
