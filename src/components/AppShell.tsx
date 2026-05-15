"use client";

import { useState, useCallback, useEffect } from "react";
import LoadingScreen from "@/components/LoadingScreen";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [loaded, setLoaded] = useState(false);

  const handleComplete = useCallback(() => {
    setLoaded(true);
    document.body.style.overflow = "";
  }, []);



  return (
    <>
      {!loaded && <LoadingScreen onComplete={handleComplete} />}
      <div className={`transition-opacity duration-700 ${loaded ? "opacity-100" : "opacity-0"}`}>
        {children}
      </div>
    </>
  );
}
