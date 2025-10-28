"use client";
import { useEffect } from "react";

export function ElementsDebugger({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    console.log("%c🟢 Elements mounted", "color: green;");
    return () => {
      console.log("%c🔴 Elements unmounted", "color: red;");
    };
  }, []);

  return <>{children}</>;
}
