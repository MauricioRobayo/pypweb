const siteName = "Pico y placa hoy";

export const baseTitle = "Pico y placa";
export const baseDescription =
  "Horario, días, fechas, números, decretos, sanciones y toda la información del pico y placa";
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
  defaultTitle: `${siteName} en Colombia`,
  description: `${baseDescription} hoy en las principales ciudades del país`,
  openGraph: {
    images: [
      {
        alt: siteName,
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
};
