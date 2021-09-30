export const baseTitle = "Pico y placa";
export const description =
  "Horario, días, fechas, placas, números, decretos, sanciones y toda la información vigente del pico y placa";
export const defaultConfig = {
  additionalLinkTags: [
    {
      href: "/favicon-32x32.png",
      rel: "icon",
      sizes: "32x32",
      type: "image/png",
    },
    {
      href: "/favicon-16x16.png",
      rel: "icon",
      sizes: "16x16",
      type: "image/png",
    },
    {
      href: "/favicon.ico",
      rel: "icon",
    },
    {
      href: "/apple-touch-icon.png",
      rel: "apple-touch-icon",
      sizes: "180x180",
    },
    {
      href: "/site.webmanifest",
      rel: "manifest",
    },
    {
      href: "/safari-pinned-tab.svg",
      rel: "mask-icon",
    },
    {
      color: "#f7c100",
      href: "/safari-pinned-tab.svg",
      rel: "mask-icon",
    },
  ],
  additionalMetaTags: [
    {
      content: "#ffc40d",
      name: "msapplication-TileColor",
    },
    {
      content: "#f7c100",
      name: "theme-color",
    },
  ],
  defaultTitle: baseTitle,
  description,
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
    site_name: baseTitle,
    type: "website",
    updated_time: `${new Date().toISOString().slice(0, 10)}T00:00:00.000-05:00`,
  },
  titleTemplate: `%s | ${baseTitle}`,
};
