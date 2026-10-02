import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Palak Singh — Graphic Designer & Visual Artist",
  description: "Portfolio of Palak Singh — Brand Identity, 3D Product Modeling, Posters, Packaging & Editorial Design.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
