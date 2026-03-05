"use client";

import { useEffect, useRef, useState } from "react";
import {
  hexToRgba,
  parseOverlay,
  toHexColor,
} from "@/lib/overlay-color";

const HEX_REGEX = /^#[0-9A-Fa-f]{6}$/;

export interface ColorPickerProps {
  /** Valor atual: hex "#RRGGBB" ou, se withOpacity, rgba/hex */
  value: string;
  /** Callback ao alterar (hex ou rgba conforme withOpacity) */
  onChange: (value: string) => void;
  /** Rótulo do campo */
  label?: string;
  /** id do input principal (acessibilidade) */
  id?: string;
  /** Placeholder do campo de texto */
  placeholder?: string;
  /** Texto de ajuda abaixo do campo */
  hint?: string;
  /** Se true, exibe slider de opacidade e aceita/retorna rgba */
  withOpacity?: boolean;
  /** Valor hex padrão quando value vazio (modo withOpacity) */
  defaultHex?: string;
  /** Opacidade padrão 0–1 quando value vazio (modo withOpacity) */
  defaultOpacity?: number;
  /** Classes adicionais no container */
  className?: string;
}

const inputBaseClass =
  "rounded-lg border bg-[var(--color-background)] text-[var(--color-text)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] border-[var(--color-border)]";
const labelClass = "mb-1 block text-sm font-medium text-[var(--color-text)]";

/**
 * Color picker reutilizável.
 * - Sem withOpacity: cor sólida em hex (#RRGGBB), ex.: cor primária global.
 * - Com withOpacity: cor + transparência (hex ou rgba), ex.: overlay de seções.
 */
export function ColorPicker({
  value,
  onChange,
  label,
  id = "color-picker",
  placeholder,
  hint,
  withOpacity = false,
  defaultHex = "#000000",
  defaultOpacity = 0.5,
  className = "",
}: ColorPickerProps) {
  if (withOpacity) {
    return (
      <ColorPickerWithOpacity
        value={value}
        onChange={onChange}
        label={label}
        id={id}
        placeholder={placeholder}
        hint={hint}
        defaultHex={defaultHex}
        defaultOpacity={defaultOpacity}
        className={className}
      />
    );
  }

  const [textInput, setTextInput] = useState(value);
  useEffect(() => {
    setTextInput(value);
  }, [value]);

  const handleColorChange = (hex: string) => {
    const normalized = toHexColor(hex);
    onChange(normalized);
    setTextInput(normalized);
  };

  const handleTextChange = (v: string) => {
    setTextInput(v);
    const trimmed = v.trim();
    if (HEX_REGEX.test(trimmed)) onChange(trimmed);
    if (trimmed === "") onChange("");
  };

  const handleTextBlur = () => {
    if (!HEX_REGEX.test(textInput.trim())) setTextInput(value || "");
  };

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <input
          id={id}
          type="color"
          value={value && HEX_REGEX.test(value) ? value : "#000000"}
          onChange={(e) => handleColorChange(e.target.value)}
          className="h-10 w-14 cursor-pointer rounded border border-[var(--color-border)] bg-transparent p-0"
          style={{ minWidth: "3.5rem" }}
        />
        <input
          type="text"
          value={textInput}
          onChange={(e) => handleTextChange(e.target.value)}
          onBlur={handleTextBlur}
          placeholder={placeholder ?? "#000000"}
          maxLength={7}
          className={`w-28 px-3 py-2 text-sm ${inputBaseClass}`}
          style={{ fontFamily: "monospace" }}
        />
      </div>
      {hint && (
        <p className="text-xs text-[var(--color-text-muted)]">{hint}</p>
      )}
    </div>
  );
}

function ColorPickerWithOpacity({
  value,
  onChange,
  label,
  id,
  placeholder,
  hint,
  defaultHex = "#000000",
  defaultOpacity = 0.5,
  className,
}: ColorPickerProps) {
  const emptyFallback = {
    hex: toHexColor(defaultHex),
    opacity: defaultOpacity,
  };
  const parsed = value?.trim()
    ? parseOverlay(value)
    : emptyFallback;
  const [hex, setHex] = useState(parsed.hex);
  const [opacity, setOpacity] = useState(Math.round(parsed.opacity * 100));

  useEffect(() => {
    const p = value?.trim()
      ? parseOverlay(value)
      : { hex: toHexColor(defaultHex), opacity: defaultOpacity };
    setHex(p.hex);
    setOpacity(Math.round(p.opacity * 100));
  }, [value, defaultHex, defaultOpacity]);

  const apply = (newHex: string, newOpacityPct: number) => {
    const alpha = newOpacityPct / 100;
    const v =
      alpha >= 1 ? toHexColor(newHex) : hexToRgba(toHexColor(newHex), alpha);
    onChange(v);
  };

  const previewCss =
    opacity >= 100
      ? toHexColor(hex)
      : hexToRgba(toHexColor(hex), opacity / 100);

  const colorInputRef = useRef<HTMLInputElement>(null);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}
      {hint && (
        <p className="mb-2 text-xs text-[var(--color-text-muted)]">{hint}</p>
      )}
      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={colorInputRef}
          id={id}
          type="color"
          value={hex}
          onChange={(e) => {
            setHex(e.target.value);
            apply(e.target.value, opacity);
          }}
          className="sr-only"
          aria-hidden
          tabIndex={-1}
        />
        <button
          type="button"
          onClick={() => colorInputRef.current?.click()}
          className="h-10 w-14 flex-shrink-0 overflow-hidden rounded border border-[var(--color-border)] p-0 cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:ring-offset-2"
          style={{
            minWidth: "3.5rem",
            background: `linear-gradient(45deg, #ccc 25%, transparent 25%), linear-gradient(-45deg, #ccc 25%, transparent 25%), linear-gradient(45deg, transparent 75%, #ccc 75%), linear-gradient(-45deg, transparent 75%, #ccc 75%)`,
            backgroundColor: "#eee",
            backgroundSize: "8px 8px",
            backgroundPosition: "0 0, 0 4px, 4px -4px, -4px 0",
          }}
          aria-label="Selecionar cor"
        >
          <span
            className="block h-full w-full"
            style={{ backgroundColor: previewCss }}
            aria-hidden
          />
        </button>
        <div className="flex flex-1 min-w-[120px] items-center gap-2">
          <span className="text-xs text-[var(--color-text-muted)]">
            Opacidade
          </span>
          <input
            type="range"
            min={0}
            max={100}
            value={opacity}
            onChange={(e) => {
              const v = Number(e.target.value);
              setOpacity(v);
              apply(hex, v);
            }}
            className="color-picker-opacity-range h-2 flex-1 flex-[1_1_8rem] min-w-0 rounded-full accent-[var(--color-primary)]"
            style={{ ["--range-fill" as string]: `${opacity}%` }}
          />
          <span className="w-8 tabular-nums text-xs text-[var(--color-text-muted)]">
            {opacity}%
          </span>
        </div>
      </div>
      <input
        type="text"
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value.trim())}
        placeholder={placeholder}
        className={`w-full px-3 py-2 text-sm ${inputBaseClass}`}
        style={{ fontFamily: "monospace" }}
      />
    </div>
  );
}
