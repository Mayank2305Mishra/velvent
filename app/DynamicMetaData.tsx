import { Metadata } from "next";

export async function generateMetadata(
  title: string
): Promise<Metadata> {
  return {
    title: `${title} | Valvent`,
    description: "Bazaar of Unforeseen Art",
    icons: {
      icon: "/logo.png",
    },
  };
}