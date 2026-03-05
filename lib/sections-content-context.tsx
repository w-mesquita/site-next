"use client";

import type {
  SectionsContentConfig,
  SectionTypeWithContent,
  SlotContentKey,
  SlotContentEntry,
  HeroContent,
  CtaContent,
  FeaturesContent,
} from "@/types/sections-content";
import { getDefaultContentForSectionType } from "@/types/sections-content";
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
  /** Conteúdo do slot (por pageId-sectionIndex); usa default ou legado se não houver entrada. */
  getContentForSlot: (
    slotKey: SlotContentKey,
    sectionType: SectionTypeWithContent
  ) => HeroContent | CtaContent | FeaturesContent;
  /** Salva o conteúdo de um slot (cada seção salva independente). */
  setContentForSlot: (
    slotKey: SlotContentKey,
    type: SectionTypeWithContent,
    content: HeroContent | CtaContent | FeaturesContent
  ) => void;
  /** @deprecated Use setContentForSlot; mantido para compatibilidade. */
  setHeroContent: (hero: SectionsContentConfig["hero"]) => void;
  /** @deprecated Use setContentForSlot; mantido para compatibilidade. */
  setCtaContent: (cta: SectionsContentConfig["cta"]) => void;
  /** @deprecated Use setContentForSlot; mantido para compatibilidade. */
  setFeaturesContent: (features: SectionsContentConfig["features"]) => void;
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

  const setFeaturesContent = useCallback(
    (features: SectionsContentConfig["features"]) => {
      setContentState((prev) => {
        const next = { ...prev, features };
        setSectionsContentInStorage(next);
        return next;
      });
    },
    []
  );

  const getContentForSlot = useCallback(
    (slotKey: SlotContentKey, sectionType: SectionTypeWithContent): HeroContent | CtaContent | FeaturesContent => {
      const entry = content.contentBySlot?.[slotKey];
      if (entry && entry.type === sectionType) {
        return entry.content;
      }
      // Sem entrada no slot: usa sempre o default do tipo para cada slot ser independente
      // (evita que Features V1 e Features V2 compartilhem o mesmo conteúdo)
      return getDefaultContentForSectionType(sectionType);
    },
    [content]
  );

  const setContentForSlot = useCallback(
    (slotKey: SlotContentKey, type: SectionTypeWithContent, slotContent: HeroContent | CtaContent | FeaturesContent) => {
      setContentState((prev) => {
        const entry: SlotContentEntry =
          type === "hero"
            ? { type: "hero", content: slotContent as HeroContent }
            : type === "cta"
              ? { type: "cta", content: slotContent as CtaContent }
              : { type: "features", content: slotContent as FeaturesContent };
        const bySlot: Record<SlotContentKey, SlotContentEntry> = { ...(prev.contentBySlot ?? {}), [slotKey]: entry };
        const next: SectionsContentConfig = { ...prev, contentBySlot: bySlot };
        setSectionsContentInStorage(next);
        return next;
      });
    },
    []
  );

  return (
    <SectionsContentContext.Provider
      value={{
        content,
        setContent,
        getContentForSlot,
        setContentForSlot,
        setHeroContent,
        setCtaContent,
        setFeaturesContent,
      }}
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
