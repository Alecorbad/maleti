"use client";

import GalleryProvider from "@/app/providers/gallery.provider";
import FullscreenProvider from "@/app/providers/fullscreen.provider";
import { MusicProvider } from "@/app/providers/music.provider";


interface ProvidersProps {
  children: React.ReactNode;
}

function Providers(props: ProvidersProps) {
    return (
      <GalleryProvider>
        <FullscreenProvider>
          <MusicProvider>{props.children}</MusicProvider>
        </FullscreenProvider>
      </GalleryProvider>
    )
}

export default Providers;
