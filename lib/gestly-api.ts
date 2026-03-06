/**
 * Cliente para a API Gestly (gestly-site-api).
 * Usado para ler e persistir sectionsConfig e sectionsContent em vez de apenas localStorage.
 */

export interface SiteDataResponse {
  sectionsConfig: Record<string, unknown> | null;
  sectionsContent: Record<string, unknown> | null;
}

export interface PutSiteDataPayload {
  sectionsConfig?: Record<string, unknown>;
  sectionsContent?: Record<string, unknown>;
}

function getApiBase(): string {
  if (typeof window === "undefined") return "";
  return (process.env.NEXT_PUBLIC_GESTLY_API_URL ?? "").replace(/\/$/, "");
}

function getSiteDomain(): string {
  if (typeof window === "undefined") return "";
  return (process.env.NEXT_PUBLIC_SITE_DOMAIN ?? "").trim();
}

function buildSiteUrl(base: string, domain: string): string {
  const url = new URL("/api/site", base);
  url.searchParams.set("domain", domain);
  return url.toString();
}

/**
 * Retorna os dados do site (config + conteúdo) da API para o domínio configurado em NEXT_PUBLIC_SITE_DOMAIN.
 * Retorna null se a API não estiver configurada, domínio não informado ou em caso de erro.
 */
export async function getSiteDataFromApi(): Promise<SiteDataResponse | null> {
  const base = getApiBase();
  const domain = getSiteDomain();
  if (!base || !domain) return null;
  try {
    const res = await fetch(buildSiteUrl(base, domain), {
      method: "GET",
      headers: { Accept: "application/json" },
    });
    if (!res.ok) return null;
    const data = (await res.json()) as SiteDataResponse;
    return data;
  } catch {
    return null;
  }
}

/**
 * Persiste config e/ou conteúdo na API para o domínio configurado em NEXT_PUBLIC_SITE_DOMAIN.
 * Retorna true se sucesso, false caso contrário.
 */
export async function putSiteDataToApi(
  payload: PutSiteDataPayload
): Promise<boolean> {
  const base = getApiBase();
  const domain = getSiteDomain();
  if (!base || !domain) return false;
  try {
    const res = await fetch(buildSiteUrl(base, domain), {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    return res.ok;
  } catch {
    return false;
  }
}
