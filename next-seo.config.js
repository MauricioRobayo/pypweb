export const siteName = "PYPHOY";
export const baseTitle = "Pico y placa";
export const baseDescription =
  "Horario, días, fechas, números, decretos, sanciones y toda la información del pico y placa";
export const defaultConfig = {
  additionalLinkTags: [
    {
      href: "icons/favicon-16x16.png",
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
    },
    {
      href: "icons/favicon-32x32.png",
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
    },
    {
      href: "icons/favicon-96x96.png",
      rel: "icon",
      sizes: "96x96",
      type: "image/png",
    },
    {
      href: "icons/favicon.ico",
      rel: "icon",
    },
    {
      href: "icons/apple-touch-icon.png",
      rel: "apple-touch-icon",
      sizes: "180x180",
    },
    {
      href: "manifest.json",
      rel: "manifest",
    },
    {
      href: "icons/safari-pinned-tab.svg",
      rel: "mask-icon",
    },
    {
      color: "#f7c100",
      href: "icons/safari-pinned-tab.svg",
      rel: "mask-icon",
    },
  ],
  additionalMetaTags: [
    {
      content: "#f7c100",
      name: "msapplication-TileColor",
    },
    {
      content: "#f7c100",
      name: "theme-color",
    },
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
