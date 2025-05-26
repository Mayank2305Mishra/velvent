import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "velvent",
    short_name: "velvent",
    description: "BAZAAR OF UNFORESEEN ART",
    start_url: '/',
    dir: "auto",
    orientation: "any",
    lang: "en-GB",
    display: 'standalone',
    theme_color: "#671b98",
    background_color: "#cac4a6",
    icons: [
      {
        src: '/icon512_maskable.png',
        sizes: '512x512',
        type: 'image/png',
      },
      {
        src: '/icon512_rounded.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}