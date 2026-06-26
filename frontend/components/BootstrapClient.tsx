"use client";

import { useEffect } from "react";

export default function BootstrapClient() {
  useEffect(() => {
    // @ts-expect-error -- no type declarations for bootstrap's bundled JS
    import("bootstrap/dist/js/bootstrap.bundle.min");
  }, []);

  return null;
}
