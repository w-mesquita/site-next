"use client";

import { useState } from "react";
import type { ContactContent } from "@/types/sections-content";
import { DEFAULT_CONTACT_CONTENT } from "@/types/sections-content";
import { Button } from "@/components/ui/Button";
import { formatBrazilianPhone, getPhoneDigits, isValidBrazilianPhone, isValidEmail } from "./contactFormUtils";

export interface ContactV2Props {
  content?: ContactContent;
}

function hasContent(value: string | undefined): boolean {
  return Boolean(value?.trim());
}

const inputClass =
  "w-full rounded-xl border bg-[var(--color-background)] px-4 py-3 text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] placeholder:opacity-50 focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] border-[var(--color-border)]";
const inputErrorClass = inputClass + " border-red-500 focus:ring-red-500";
const labelClass = "mb-1.5 block text-sm font-medium text-[var(--color-text)]";
const errorTextClass = "mt-1 text-sm text-red-600";

export function ContactV2({ content: contentProp }: ContactV2Props) {
  const content = contentProp ?? DEFAULT_CONTACT_CONTENT;
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; phone?: string; email?: string }>({});
  const [submitStatus, setSubmitStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [submitError, setSubmitError] = useState<string>("");

  const formActionUrl = content.formActionUrl?.trim();
  const bgImage = content.backgroundImage?.trim();
  const overlayColor = content.overlayColor?.trim();
  const defaultBg = "var(--color-surface)";
  const bgColor = bgImage
    ? (content.backgroundColor?.trim() || defaultBg)
    : (overlayColor || content.backgroundColor?.trim() || defaultBg);
  const overlayStyle = overlayColor || "color-mix(in srgb, var(--color-background) 65%, transparent)";
  const showBadge = hasContent(content.badge);
  const showTitle = hasContent(content.title);
  const showDescription = hasContent(content.description);
  const textColor = content.textColor?.trim();
  const titleStyle = textColor ? { color: textColor } : { color: "var(--color-text)" };
  const bodyStyle = textColor ? { color: textColor, opacity: 0.9 } : { color: "var(--color-text-muted)" };
  const badgeStyle = textColor ? { color: textColor, opacity: 0.9 } : { color: "var(--color-text-muted)" };

  function handlePhoneChange(e: React.ChangeEvent<HTMLInputElement>) {
    setPhone(formatBrazilianPhone(e.target.value));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nextErrors: { name?: string; phone?: string; email?: string } = {};
    const nameTrim = name.trim();
    const phoneDigits = getPhoneDigits(phone);
    const emailTrim = email.trim();

    if (!nameTrim) nextErrors.name = "Nome é obrigatório.";
    const hasPhone = isValidBrazilianPhone(phone);
    const hasValidEmail = emailTrim ? isValidEmail(emailTrim) : false;
    const bothEmpty = !phoneDigits.length && !emailTrim;
    if (bothEmpty) {
      nextErrors.phone = "Celular/Telefone ou E-mail é obrigatório (preencha pelo menos um).";
      nextErrors.email = "Celular/Telefone ou E-mail é obrigatório (preencha pelo menos um).";
    } else {
      if (phoneDigits.length > 0 && !hasPhone) nextErrors.phone = "Informe um celular ou telefone válido (10 ou 11 dígitos).";
      if (emailTrim && !isValidEmail(emailTrim)) nextErrors.email = "Informe um e-mail válido.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    if (!formActionUrl) {
      setSubmitStatus("success");
      setSubmitError("");
      return;
    }

    setSubmitStatus("sending");
    setSubmitError("");
    const formData = new FormData();
    formData.append("name", nameTrim);
    formData.append("phone", phone);
    formData.append("email", emailTrim);
    formData.append("message", message.trim());

    try {
      const res = await fetch(formActionUrl, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitStatus("success");
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        const data = await res.json().catch(() => ({}));
        setSubmitStatus("error");
        setSubmitError(data.error || "Falha ao enviar. Tente novamente ou use o e-mail/telefone do site.");
      }
    } catch {
      setSubmitStatus("error");
      setSubmitError("Falha ao enviar. Verifique sua conexão ou tente mais tarde.");
    }
  }

  return (
    <section
      className="relative overflow-hidden px-4 py-16 md:px-6 md:py-24 lg:py-28"
      style={{
        backgroundColor: bgColor,
        ...(bgImage && {
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }),
      }}
      aria-label="Contato"
    >
      {bgImage && (
        <div className="absolute inset-0 z-[1]" style={{ background: overlayStyle }} aria-hidden />
      )}
      <div className="relative z-10 mx-auto max-w-2xl">
        <header className="text-center">
          {showBadge && (
            <div
              className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wider"
              style={{
                backgroundColor: textColor ? "color-mix(in srgb, currentColor 15%, transparent)" : "color-mix(in srgb, var(--color-text-muted) 10%, transparent)",
                borderColor: textColor ? "color-mix(in srgb, currentColor 25%, transparent)" : "color-mix(in srgb, var(--color-text-muted) 20%, transparent)",
                ...badgeStyle,
              }}
            >
              <span
                className="h-2 w-2 animate-pulse rounded-full"
                style={{ backgroundColor: "currentColor" }}
              />
              {content.badge}
            </div>
          )}
          {showTitle && (
            <h2 className="mt-3 text-2xl font-bold leading-tight tracking-tight md:text-3xl" style={titleStyle}>
              {content.title}
            </h2>
          )}
          {showDescription && (
            <p className="mt-3 text-base leading-relaxed" style={bodyStyle}>
              {content.description}
            </p>
          )}
        </header>

        <form onSubmit={handleSubmit} className="mt-8 space-y-4 rounded-2xl border border-[var(--color-border)] bg-[var(--color-background)] p-6 shadow-sm md:p-8">
          <div>
            <label htmlFor="contact-v2-name" className={labelClass}>
              {content.labelName} <span className="text-red-600" aria-hidden>*</span>
            </label>
            <input
              id="contact-v2-name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={errors.name ? inputErrorClass : inputClass}
              placeholder="Seu nome"
              autoComplete="name"
              required
              aria-required="true"
              aria-invalid={Boolean(errors.name)}
            />
            {errors.name && <p className={errorTextClass} role="alert">{errors.name}</p>}
          </div>
          <div>
            <label htmlFor="contact-v2-phone" className={labelClass}>
              {content.labelPhone} <span className="text-red-600" aria-hidden>*</span>
            </label>
            <input
              id="contact-v2-phone"
              type="tel"
              value={phone}
              onChange={handlePhoneChange}
              className={errors.phone ? inputErrorClass : inputClass}
              placeholder="(00) 00000-0000"
              autoComplete="tel"
              aria-invalid={Boolean(errors.phone)}
            />
            {errors.phone && <p className={errorTextClass} role="alert">{errors.phone}</p>}
          </div>
          <div>
            <label htmlFor="contact-v2-email" className={labelClass}>
              {content.labelEmail} <span className="text-red-600" aria-hidden>*</span>
            </label>
            <input
              id="contact-v2-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={errors.email ? inputErrorClass : inputClass}
              placeholder="seu@email.com"
              autoComplete="email"
              aria-invalid={Boolean(errors.email)}
            />
            {errors.email && <p className={errorTextClass} role="alert">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="contact-v2-message" className={labelClass}>
              {content.labelMessage}
            </label>
            <textarea
              id="contact-v2-message"
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className={inputClass}
              placeholder="Sua mensagem"
            />
          </div>
          <p className="text-sm text-[var(--color-text-muted)]">* Nome é obrigatório. Preencha também o Celular/Telefone ou o E-mail (pelo menos um dos dois).</p>
          {submitStatus === "success" && (
            <p className="rounded-lg bg-green-100 px-4 py-3 text-sm text-green-800" role="status">
              {formActionUrl ? "Mensagem enviada com sucesso! Em breve retornaremos." : "Formulário validado. Configure a URL de envio nas configurações da seção para receber os e-mails."}
            </p>
          )}
          {submitStatus === "error" && submitError && (
            <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
              {submitError}
            </p>
          )}
          <div className="pt-2">
            <Button type="submit" variant="primary" size="md" className="w-full sm:w-auto" disabled={submitStatus === "sending"}>
              {submitStatus === "sending" ? "Enviando…" : content.submitLabel}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
}
