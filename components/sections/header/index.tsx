import type { HeaderVariant } from "@/types/sections";
import { HeaderV1 } from "./HeaderV1";
import { HeaderV2 } from "./HeaderV2";
import { HeaderV3 } from "./HeaderV3";

const registry = {
  v1: HeaderV1,
  v2: HeaderV2,
  v3: HeaderV3,
} as const;

export interface HeaderSectionProps {
  variant: HeaderVariant;
}

export function HeaderSection({ variant }: HeaderSectionProps) {
  const Component = registry[variant] ?? registry.v1;
  return <Component />;
}

export { HeaderV1, HeaderV2, HeaderV3 };
