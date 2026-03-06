"use client";

import type {
  SectionsContentConfig,
  SectionTypeWithContent,
  SlotContentKey,
  SlotContentEntry,
  HeroContent,
  CtaContent,
  FeaturesContent,
  ServicesContent,
  PartnersContent,
  ContactContent,
} from "@/types/sections-content";
import { getDefaultContentForSectionType } from "@/types/sections-content";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { parseSectionsContentFromRaw } from "./sections-content-client";
import { getSiteDataFromApi, putSiteDataToApi } from "./gestly-api";

export const API_UNAVAILABLE_MESSAGE =
  "Serviço indisponível. Entre em contato com o administrador.";

interface SectionsContentContextValue {
  content: SectionsContentConfig;
  setContent: (content: SectionsContentConfig) => void;
  /** true até a primeira resposta da API (GET) ser processada */
  apiLoading: boolean;
  /** true quando a carga inicial da API falhou ou não está configurada */
  apiLoadError: boolean;
  /** mensagem quando o último save falhou; null quando não há erro */
  apiSaveError: string | null;
  clearSaveError: () => void;
  /** Conteúdo do slot (por pageId-sectionIndex); usa default ou legado se não houver entrada. */
  getContentForSlot: (
    slotKey: SlotContentKey,
    sectionType: SectionTypeWithContent
  ) => HeroContent | CtaContent | FeaturesContent | ServicesContent | PartnersContent | ContactContent;
  /** Salva o conteúdo de um slot (cada seção salva independente). */
  setContentForSlot: (
    slotKey: SlotContentKey,
    type: SectionTypeWithContent,
    content: HeroContent | CtaContent | FeaturesContent | ServicesContent | PartnersContent | ContactContent
  ) => void;
  /** @deprecated Use setContentForSlot; mantido para compatibilidade. */
  setHeroContent: (hero: SectionsContentConfig["hero"]) => void;
  /** @deprecated Use setContentForSlot; mantido para compatibilidade. */
  setCtaContent: (cta: SectionsContentConfig["cta"]) => void;
  /** @deprecated Use setContentForSlot; mantido para compatibilidade. */
  setFeaturesContent: (features: SectionsContentConfig["features"]) => void;
  /** @deprecated Use setContentForSlot; mantido para compatibilidade. */
  setServicesContent: (services: SectionsContentConfig["services"]) => void;
  /** @deprecated Use setContentForSlot; mantido para compatibilidade. */
  setPartnersContent: (partners: SectionsContentConfig["partners"]) => void;
  /** @deprecated Use setContentForSlot; mantido para compatibilidade. */
  setContactContent: (contact: SectionsContentConfig["contact"]) => void;
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
  const [apiLoading, setApiLoading] = useState(true);
  const [apiLoadError, setApiLoadError] = useState(false);
  const [apiSaveError, setApiSaveError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    getSiteDataFromApi()
      .then((data) => {
        if (cancelled) return;
        // Erro só quando a API não respondeu (null = falha de rede / não configurada)
        if (data === null) {
          setApiLoadError(true);
          return;
        }
        setApiLoadError(false);
        if (data.sectionsContent != null) {
          const fromApi = parseSectionsContentFromRaw(
            data.sectionsContent as Record<string, unknown>
          );
          if (fromApi) setContentState(fromApi);
        }
      })
      .catch(() => {
        if (!cancelled) setApiLoadError(true);
      })
      .finally(() => {
        if (!cancelled) setApiLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  const setContent = useCallback((newContent: SectionsContentConfig) => {
    setContentState(newContent);
    setApiSaveError(null);
    putSiteDataToApi({
      sectionsContent: newContent as unknown as Record<string, unknown>,
    }).then((ok) => {
      if (!ok) setApiSaveError(API_UNAVAILABLE_MESSAGE);
    });
  }, []);

  const persistContent = useCallback((next: SectionsContentConfig) => {
    setApiSaveError(null);
    putSiteDataToApi({
      sectionsContent: next as unknown as Record<string, unknown>,
    }).then((ok) => {
      if (!ok) setApiSaveError(API_UNAVAILABLE_MESSAGE);
    });
  }, []);

  const clearSaveError = useCallback(() => setApiSaveError(null), []);

  const setHeroContent = useCallback(
    (hero: SectionsContentConfig["hero"]) => {
      setContentState((prev) => {
        const next = { ...prev, hero };
        persistContent(next);
        return next;
      });
    },
    [persistContent]
  );

  const setCtaContent = useCallback(
    (cta: SectionsContentConfig["cta"]) => {
      setContentState((prev) => {
        const next = { ...prev, cta };
        persistContent(next);
        return next;
      });
    },
    [persistContent]
  );

  const setFeaturesContent = useCallback(
    (features: SectionsContentConfig["features"]) => {
      setContentState((prev) => {
        const next = { ...prev, features };
        persistContent(next);
        return next;
      });
    },
    [persistContent]
  );

  const setServicesContent = useCallback(
    (services: SectionsContentConfig["services"]) => {
      setContentState((prev) => {
        const next = { ...prev, services };
        persistContent(next);
        return next;
      });
    },
    [persistContent]
  );

  const setPartnersContent = useCallback(
    (partners: SectionsContentConfig["partners"]) => {
      setContentState((prev) => {
        const next = { ...prev, partners };
        persistContent(next);
        return next;
      });
    },
    [persistContent]
  );

  const setContactContent = useCallback(
    (contact: SectionsContentConfig["contact"]) => {
      setContentState((prev) => {
        const next = { ...prev, contact };
        persistContent(next);
        return next;
      });
    },
    [persistContent]
  );

  const getContentForSlot = useCallback(
    (slotKey: SlotContentKey, sectionType: SectionTypeWithContent): HeroContent | CtaContent | FeaturesContent | ServicesContent | PartnersContent | ContactContent => {
      const entry = content.contentBySlot?.[slotKey];
      if (entry && entry.type === sectionType) {
        return entry.content;
      }
      if (sectionType === "hero" && content.hero) return content.hero;
      if (sectionType === "cta" && content.cta) return content.cta;
      if (sectionType === "features" && content.features) return content.features;
      if (sectionType === "services" && content.services) return content.services;
      if (sectionType === "partners" && content.partners) return content.partners;
      if (sectionType === "contact" && content.contact) return content.contact;
      return getDefaultContentForSectionType(sectionType);
    },
    [content]
  );

  const setContentForSlot = useCallback(
    (slotKey: SlotContentKey, type: SectionTypeWithContent, slotContent: HeroContent | CtaContent | FeaturesContent | ServicesContent | PartnersContent | ContactContent) => {
      setContentState((prev) => {
        const entry: SlotContentEntry =
          type === "hero"
            ? { type: "hero", content: slotContent as HeroContent }
            : type === "cta"
              ? { type: "cta", content: slotContent as CtaContent }
              : type === "features"
                ? { type: "features", content: slotContent as FeaturesContent }
                : type === "services"
                  ? { type: "services", content: slotContent as ServicesContent }
                  : type === "partners"
                    ? { type: "partners", content: slotContent as PartnersContent }
                    : { type: "contact", content: slotContent as ContactContent };
        const bySlot: Record<SlotContentKey, SlotContentEntry> = { ...(prev.contentBySlot ?? {}), [slotKey]: entry };
        const next: SectionsContentConfig = { ...prev, contentBySlot: bySlot };
        persistContent(next);
        return next;
      });
    },
    [persistContent]
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
        setServicesContent,
        setPartnersContent,
        setContactContent,
        apiLoading,
        apiLoadError,
        apiSaveError,
        clearSaveError,
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
