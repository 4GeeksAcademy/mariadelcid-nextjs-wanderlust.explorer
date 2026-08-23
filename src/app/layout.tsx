import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";
import { FavoritesProvider } from "../context/FavoritesContext";
import { experiences } from "../data/experiences";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wanderlust Labs",
  description: "Descubre y guarda experiencias unicas alrededor del mundo.",
};

const categories = Array.from(new Set(experiences.map((experience) => experience.category)));

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-zinc-50 text-zinc-900">
        <FavoritesProvider>
          <div className="flex min-h-screen flex-col">
            <Header categories={categories} />
            <div className="flex-1">{children}</div>
            <Footer categories={categories} />
          </div>
        </FavoritesProvider>
      </body>
    </html>
  );
}
