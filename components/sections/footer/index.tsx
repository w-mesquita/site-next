import type { FooterVariant } from "@/types/sections";
import { FooterV1 } from "./FooterV1";
import { FooterV2 } from "./FooterV2";
import { FooterV3 } from "./FooterV3";

const registry = {
  v1: FooterV1,
  v2: FooterV2,
  v3: FooterV3,
} as const;

export interface FooterSectionProps {
  variant: FooterVariant;
}

export function FooterSection({ variant }: FooterSectionProps) {
  const Component = registry[variant] ?? registry.v1;
  return <Component />;
}

export { FooterV1, FooterV2, FooterV3 };
