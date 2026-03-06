/**
 * Máscara brasileira: (XX) XXXXX-XXXX (celular) ou (XX) XXXX-XXXX (fixo).
 * Aceita apenas dígitos; formata enquanto digita.
 */
export function formatBrazilianPhone(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 11);
  if (digits.length <= 2) return digits ? `(${digits}` : "";
  if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

/** Extrai apenas os dígitos do telefone (para validação/envio). */
export function getPhoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

/** Telefone brasileiro válido: 10 ou 11 dígitos. */
export function isValidBrazilianPhone(value: string): boolean {
  const digits = getPhoneDigits(value);
  return digits.length === 10 || digits.length === 11;
}

/** Validação simples de email. */
export function isValidEmail(value: string): boolean {
  if (!value?.trim()) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}
