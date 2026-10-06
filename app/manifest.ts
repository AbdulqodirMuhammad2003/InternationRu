import type { MetadataRoute } from "next";

/** PWA manifesti — sayt telefonga ilova sifatida o'rnatiladi (bosh ekranda
 *  belgi, brauzer panelisiz to'liq ekran). */
export default function manifest(): MetadataRoute.Manifest {
  return {
    id: "/",
    name: "Avangard — Rus tili maktabi",
    short_name: "Avangard",
    description: "O'zbek o'quvchilari uchun rus tili kursi — lug'at, qoidalar, mashqlar va imtihonlar.",
    lang: "uz",
    start_url: "/lessons",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#0f131c",
    theme_color: "#0f131c",
    categories: ["education"],
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
