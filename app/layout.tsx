import { Toaster } from "@/components/ui/sonner"
import type { Metadata } from "next";
import { Artifika, Montserrat } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";

const artifika = Artifika({
  variable: "--font-artifika",
  subsets: ["latin"],
  weight: "400",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Velvent",
  description: "Bazaar of Unforeseen Art",
  icons: {
    icon: "/logo.png",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <AuthProvider>
      <body
        className={`${montserrat.variable} ${artifika.variable} antialiased`}
      >
        {children}
        <Toaster/>
      </body>
      </AuthProvider>
    </html>
  );
}
