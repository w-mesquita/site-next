"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { SocialConfig } from "@/types/social";
import { DEFAULT_SOCIAL_CONFIG } from "@/types/social";
import {
  getSocialConfigFromStorage,
  setSocialConfigInStorage,
} from "./social-config-client";

interface SocialConfigContextValue {
  config: SocialConfig;
  setConfig: (config: SocialConfig) => void;
}

const SocialConfigContext = createContext<SocialConfigContextValue | null>(null);

interface SocialConfigProviderProps {
  children: React.ReactNode;
}

export function SocialConfigProvider({ children }: SocialConfigProviderProps) {
  const [config, setConfigState] = useState<SocialConfig>(DEFAULT_SOCIAL_CONFIG);

  useEffect(() => {
    const stored = getSocialConfigFromStorage();
    if (stored) {
      setConfigState(stored);
    }
  }, []);

  const setConfig = useCallback((newConfig: SocialConfig) => {
    setConfigState(newConfig);
    setSocialConfigInStorage(newConfig);
  }, []);

  return (
    <SocialConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </SocialConfigContext.Provider>
  );
}

export function useSocialConfig(): SocialConfigContextValue {
  const ctx = useContext(SocialConfigContext);
  if (!ctx) {
    throw new Error("useSocialConfig must be used within SocialConfigProvider");
  }
  return ctx;
}
