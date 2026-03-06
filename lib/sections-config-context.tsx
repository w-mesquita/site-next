"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { SectionsConfig } from "@/types/sections";
import { parseSectionsConfigFromRaw } from "./sections-config-client";
import { getSiteDataFromApi, putSiteDataToApi } from "./gestly-api";

export const API_UNAVAILABLE_MESSAGE =
  "Serviço indisponível. Entre em contato com o administrador.";

interface SectionsConfigContextValue {
  config: SectionsConfig;
  setConfig: (config: SectionsConfig) => void;
  /** true até a primeira resposta da API (GET) ser processada */
  apiLoading: boolean;
  /** true quando a carga inicial da API falhou ou não está configurada */
  apiLoadError: boolean;
  /** mensagem quando o último save falhou; null quando não há erro */
  apiSaveError: string | null;
  clearSaveError: () => void;
}

const SectionsConfigContext = createContext<SectionsConfigContextValue | null>(
  null
);

interface SectionsConfigProviderProps {
  children: React.ReactNode;
  initialConfig: SectionsConfig;
}

export function SectionsConfigProvider({
  children,
  initialConfig,
}: SectionsConfigProviderProps) {
  const [config, setConfigState] = useState<SectionsConfig>(initialConfig);
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
        if (data.sectionsConfig != null) {
          const fromApi = parseSectionsConfigFromRaw(
            data.sectionsConfig as Record<string, unknown>
          );
          if (fromApi) setConfigState(fromApi);
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

  const setConfig = useCallback((newConfig: SectionsConfig) => {
    setConfigState(newConfig);
    setApiSaveError(null);
    putSiteDataToApi({
      sectionsConfig: newConfig as unknown as Record<string, unknown>,
    }).then((ok) => {
      if (!ok) setApiSaveError(API_UNAVAILABLE_MESSAGE);
    });
  }, []);

  const clearSaveError = useCallback(() => setApiSaveError(null), []);

  return (
    <SectionsConfigContext.Provider
      value={{
        config,
        setConfig,
        apiLoading,
        apiLoadError,
        apiSaveError,
        clearSaveError,
      }}
    >
      {children}
    </SectionsConfigContext.Provider>
  );
}

export function useSectionsConfig(): SectionsConfigContextValue {
  const ctx = useContext(SectionsConfigContext);
  if (!ctx) {
    throw new Error("useSectionsConfig must be used within SectionsConfigProvider");
  }
  return ctx;
}
