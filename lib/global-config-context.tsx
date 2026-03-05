"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { GlobalConfig } from "@/types/global-config";
import {
  getGlobalConfigFromStorage,
  setGlobalConfigInStorage,
} from "./global-config-client";

interface GlobalConfigContextValue {
  config: GlobalConfig;
  setConfig: (config: GlobalConfig) => void;
  setPrimaryColor: (color: string) => void;
  setLogoUrl: (url: string) => void;
}

const GlobalConfigContext = createContext<GlobalConfigContextValue | null>(null);

interface GlobalConfigProviderProps {
  children: React.ReactNode;
  initialConfig: GlobalConfig;
}

export function GlobalConfigProvider({
  children,
  initialConfig,
}: GlobalConfigProviderProps) {
  const [config, setConfigState] = useState<GlobalConfig>(initialConfig);

  useEffect(() => {
    const stored = getGlobalConfigFromStorage();
    if (stored) setConfigState(stored);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--color-primary", config.primaryColor);
  }, [config.primaryColor]);

  const setConfig = useCallback((newConfig: GlobalConfig) => {
    setConfigState(newConfig);
    setGlobalConfigInStorage(newConfig);
  }, []);

  const setPrimaryColor = useCallback((primaryColor: string) => {
    setConfigState((prev) => {
      const next = { ...prev, primaryColor };
      setGlobalConfigInStorage(next);
      return next;
    });
  }, []);

  const setLogoUrl = useCallback((logoUrl: string) => {
    setConfigState((prev) => {
      const next = { ...prev, logoUrl };
      setGlobalConfigInStorage(next);
      return next;
    });
  }, []);

  return (
    <GlobalConfigContext.Provider
      value={{ config, setConfig, setPrimaryColor, setLogoUrl }}
    >
      {children}
    </GlobalConfigContext.Provider>
  );
}

export function useGlobalConfig(): GlobalConfigContextValue {
  const ctx = useContext(GlobalConfigContext);
  if (!ctx) {
    throw new Error("useGlobalConfig must be used within GlobalConfigProvider");
  }
  return ctx;
}
