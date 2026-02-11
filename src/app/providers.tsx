'use client'

import GalleryProvider from "@/app/providers/gallery.provider"
import FullscreenProvider from "@/app/providers/fullscreen.provider"


interface ProvidersProps{
  children: React.ReactNode,
}

function Providers(props: ProvidersProps) {
    return (
      <GalleryProvider>
        <FullscreenProvider>
          {props.children}
        </FullscreenProvider>
      </GalleryProvider>
    )
}

export default Providers;
