import type { Metadata, Viewport } from "next";
import "./globals.css";
import Providers from "./providers";
import ScrollManager from "./utils/scroll-manager";
import MusicPlayer from "./components/musicPlayer";

export const metadata: Metadata = {
  title: "Simona Maleti",
  description: "Sito dell'artista Simona Maleti",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="it">
      <body>
        <ScrollManager />
        <Providers>
          <MusicPlayer />
          {children}
        </Providers>
      </body>
    </html>
  );
}
