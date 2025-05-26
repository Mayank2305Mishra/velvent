import { Metadata } from "next";

export async function generateMetadata(
  title: string
): Promise<Metadata> {
  return {
    title: `${title} | velvent`,
    description: "Bazaar of Unforeseen Art",
    icons: {
      icon: "/logo.png",
    },
  };
}