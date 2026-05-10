import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BUILDPRO - Gestion ERP BTP",
  description: "Plateforme complète de gestion pour entreprises BTP",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="bg-background">
      <body className="antialiased">{children}</body>
    </html>
  );
}
