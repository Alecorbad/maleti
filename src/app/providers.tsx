'use client'

import GalleryProvider from "@/app/providers/gallery.provider"


interface ProvidersProps{
  children: React.ReactNode,
}

function Providers(props: ProvidersProps) {
    return (
      <GalleryProvider>
        {props.children}
      </GalleryProvider>
    )
}

export default Providers;
