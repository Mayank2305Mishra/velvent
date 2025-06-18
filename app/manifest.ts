import type { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Velvent",
    short_name: "Velvent",
    description: "BAZAAR OF UNFORESEEN ART",
    start_url: '/',
    dir: "auto",
    orientation: "any",
    lang: "en-GB",
    display: 'standalone',
    theme_color: "#00FFFFFF",
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