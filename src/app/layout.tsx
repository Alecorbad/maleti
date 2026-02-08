import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import ScrollManager from "./utils/scroll-manager";
// import MusicPlayer from "./components/musicPlayer";

export const metadata: Metadata = {
  title: "Simona Maleti",
  description: "Sito dell'artista Simona Maleti",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  //<MusicPlayer />
  return (
    <html lang="it">
      <body>
        <ScrollManager />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
