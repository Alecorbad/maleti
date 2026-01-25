
// app/template.tsx
"use client";

import Providers from "./providers";
import PageTransition from "./animations/PageTransition";

export default function Template({ children }: { children: React.ReactNode }) {

  return (
    <>
      <PageTransition>
        <Providers>
          {children}
        </Providers>
      </PageTransition>
    </>
  );
}
