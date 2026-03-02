"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import type { WhatsAppConfig } from "@/types/whatsapp";
import { DEFAULT_WHATSAPP_CONFIG } from "@/types/whatsapp";
import {
  getWhatsAppConfigFromStorage,
  setWhatsAppConfigInStorage,
} from "./whatsapp-config-client";

interface WhatsAppConfigContextValue {
  config: WhatsAppConfig;
  setConfig: (config: WhatsAppConfig) => void;
}

const WhatsAppConfigContext = createContext<WhatsAppConfigContextValue | null>(
  null
);

interface WhatsAppConfigProviderProps {
  children: React.ReactNode;
}

export function WhatsAppConfigProvider({ children }: WhatsAppConfigProviderProps) {
  const [config, setConfigState] = useState<WhatsAppConfig>(DEFAULT_WHATSAPP_CONFIG);

  useEffect(() => {
    const stored = getWhatsAppConfigFromStorage();
    if (stored) {
      setConfigState(stored);
    }
  }, []);

  const setConfig = useCallback((newConfig: WhatsAppConfig) => {
    setConfigState(newConfig);
    setWhatsAppConfigInStorage(newConfig);
  }, []);

  return (
    <WhatsAppConfigContext.Provider value={{ config, setConfig }}>
      {children}
    </WhatsAppConfigContext.Provider>
  );
}

export function useWhatsAppConfig(): WhatsAppConfigContextValue {
  const ctx = useContext(WhatsAppConfigContext);
  if (!ctx) {
    throw new Error("useWhatsAppConfig must be used within WhatsAppConfigProvider");
  }
  return ctx;
}
