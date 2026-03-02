import type { HeroVariant } from "@/types/sections";
import { HeroV1 } from "./HeroV1";
import { HeroV2 } from "./HeroV2";
import { HeroV3 } from "./HeroV3";

const registry = {
  v1: HeroV1,
  v2: HeroV2,
  v3: HeroV3,
} as const;

export interface HeroSectionProps {
  variant: HeroVariant;
}

export function HeroSection({ variant }: HeroSectionProps) {
  const Component = registry[variant] ?? registry.v1;
  return <Component />;
}

export { HeroV1, HeroV2, HeroV3 };
export { HeroSectionFromConfig } from "./HeroSectionFromConfig";
