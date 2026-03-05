"use client";

import type { SectionsContentConfig } from "@/types/sections-content";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  getSectionsContentFromStorage,
  setSectionsContentInStorage,
} from "./sections-content-client";

interface SectionsContentContextValue {
  content: SectionsContentConfig;
  setContent: (content: SectionsContentConfig) => void;
  setHeroContent: (hero: SectionsContentConfig["hero"]) => void;
  setCtaContent: (cta: SectionsContentConfig["cta"]) => void;
}

const SectionsContentContext = createContext<SectionsContentContextValue | null>(
  null
);

interface SectionsContentProviderProps {
  children: React.ReactNode;
  initialContent: SectionsContentConfig;
}

export function SectionsContentProvider({
  children,
  initialContent,
}: SectionsContentProviderProps) {
  const [content, setContentState] = useState<SectionsContentConfig>(initialContent);

  useEffect(() => {
    const stored = getSectionsContentFromStorage();
    if (stored) setContentState(stored);
  }, []);

  const setContent = useCallback((newContent: SectionsContentConfig) => {
    setContentState(newContent);
    setSectionsContentInStorage(newContent);
  }, []);

  const setHeroContent = useCallback(
    (hero: SectionsContentConfig["hero"]) => {
      setContentState((prev) => {
        const next = { ...prev, hero };
        setSectionsContentInStorage(next);
        return next;
      });
    },
    []
  );

  const setCtaContent = useCallback(
    (cta: SectionsContentConfig["cta"]) => {
      setContentState((prev) => {
        const next = { ...prev, cta };
        setSectionsContentInStorage(next);
        return next;
      });
    },
    []
  );

  return (
    <SectionsContentContext.Provider
      value={{ content, setContent, setHeroContent, setCtaContent }}
    >
      {children}
    </SectionsContentContext.Provider>
  );
}

export function useSectionsContent(): SectionsContentContextValue {
  const ctx = useContext(SectionsContentContext);
  if (!ctx) {
    throw new Error(
      "useSectionsContent must be used within SectionsContentProvider"
    );
  }
  return ctx;
}
