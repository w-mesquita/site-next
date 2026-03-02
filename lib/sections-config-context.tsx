"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { SectionsConfig } from "@/types/sections";
import {
  getSectionsConfigFromStorage,
  setSectionsConfigInStorage,
} from "./sections-config-client";
import { DEFAULT_SECTIONS_CONFIG } from "@/types/sections";

interface SectionsConfigContextValue {
  config: SectionsConfig;
  setConfig: (config: SectionsConfig) => void;
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

  useEffect(() => {
    const stored = getSectionsConfigFromStorage();
    if (stored) {
      setConfigState(stored);
    }
  }, []);

  const setConfig = useCallback((newConfig: SectionsConfig) => {
    setConfigState(newConfig);
    setSectionsConfigInStorage(newConfig);
  }, []);

  return (
    <SectionsConfigContext.Provider value={{ config, setConfig }}>
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
