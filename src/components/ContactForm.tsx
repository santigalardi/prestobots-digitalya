"use client";

import { useState, type FormEvent } from "react";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [state, setState] = useState<FormState>("idle");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("submitting");

    // TODO: conectar a HubSpot / endpoint real cuando lo defina el cliente.
    await new Promise((r) => setTimeout(r, 800));
    setState("success");
  }

  if (state === "success") {
    return (
      <div className="relative bg-ink text-paper-warm rounded-3xl p-10 md:p-14 text-center overflow-hidden">
        {/* Glow amarillo de fondo */}
        <div
          className="absolute inset-0 opacity-25 blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, var(--color-brand-yellow), transparent 60%)",
          }}
        />
        <div className="relative">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-yellow flex items-center justify-center">
            <svg
              className="w-8 h-8 text-ink"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-yellow font-bold mb-3">
            ▸ Recibido
          </p>
          <h3
            className="text-[28px] md:text-[36px] font-display leading-tight text-white mb-3 tracking-[-0.02em]"
            style={{ fontWeight: 500 }}
          >
            Tu pedido llegó.
          </h3>
          <p className="text-[15px] md:text-[16px] text-white/70 max-w-md mx-auto leading-[1.6]">
            Un especialista de PrestoBots te va a contactar en menos de 24
            horas para coordinar la demo.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative bg-bg border border-ink/10 rounded-3xl p-7 md:p-10 shadow-[0_20px_60px_-20px_rgba(10,10,10,0.12)]"
    >
      {/* Header del form */}
      <div className="flex items-center justify-between mb-8 pb-6 border-b border-ink/8">
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink font-bold">
          Datos de contacto
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint">
          ~ 30 segundos
        </span>
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        <Field id="name" label="Nombre y apellido" required />
        <Field id="clinic" label="Nombre de la clínica" required />

        <Field
          id="email"
          label="Email corporativo"
          type="email"
          required
          autoComplete="email"
        />
        <Field
          id="phone"
          label="Teléfono / WhatsApp"
          type="tel"
          required
          autoComplete="tel"
        />
      </div>

      <div className="mt-5">
        <SelectField
          id="doctors"
          label="Cantidad de médicos en la clínica"
          options={[
            { value: "", label: "Seleccionar" },
            { value: "1-5", label: "1 a 5" },
            { value: "6-15", label: "6 a 15" },
            { value: "16-50", label: "16 a 50" },
            { value: "50+", label: "Más de 50" },
          ]}
          required
        />
      </div>

      {/* Footer del form */}
      <div className="mt-8 pt-6 border-t border-ink/8">
        <p className="text-[12px] text-muted leading-relaxed">
          Al enviar aceptás nuestra política de privacidad. Te contactaremos
          solo para coordinar la demo.
        </p>
      </div>

      <button
        type="submit"
        disabled={state === "submitting"}
        className="group relative w-full mt-6 bg-ink text-paper-warm font-medium px-7 py-5 rounded-full hover:bg-ink-soft transition-colors cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3 text-[15px] overflow-hidden"
      >
        {/* Sweep amarillo on hover */}
        <span className="absolute inset-0 bg-brand-yellow translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-500 ease-out" />
        <span className="relative flex items-center gap-3 group-hover:text-ink transition-colors">
          {state === "submitting" ? (
            <>
              <span className="w-4 h-4 rounded-full border-2 border-paper-warm/30 border-t-paper-warm animate-spin" />
              Enviando…
            </>
          ) : (
            <>
              Quiero agendar mi demo
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="transition-transform group-hover:translate-x-1"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </>
          )}
        </span>
      </button>

      {state === "error" && (
        <p className="text-sm text-red-600 mt-3 text-center">
          Hubo un error al enviar el formulario. Intentá de nuevo.
        </p>
      )}
    </form>
  );
}

type FieldProps = {
  id: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
};

function Field({
  id,
  label,
  type = "text",
  required,
  placeholder,
  autoComplete,
}: FieldProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[13px] font-semibold text-heading mb-2"
      >
        {label}
        {required && (
          <span className="text-brand-yellow-deep ml-1" aria-label="requerido">
            *
          </span>
        )}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required={required}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="w-full px-4 py-3 bg-paper-warm/40 border border-ink/10 rounded-xl text-[15px] text-heading placeholder:text-faint focus:outline-none focus:border-ink focus:bg-bg transition-all"
      />
    </div>
  );
}

type SelectProps = {
  id: string;
  label: string;
  options: { value: string; label: string }[];
  required?: boolean;
};

function SelectField({ id, label, options, required }: SelectProps) {
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-[13px] font-semibold text-heading mb-2"
      >
        {label}
        {required && (
          <span className="text-brand-yellow-deep ml-1" aria-label="requerido">
            *
          </span>
        )}
      </label>
      <div className="relative">
        <select
          id={id}
          name={id}
          required={required}
          defaultValue=""
          className="w-full px-4 py-3 pr-10 bg-paper-warm/40 border border-ink/10 rounded-xl text-[15px] text-heading focus:outline-none focus:border-ink focus:bg-bg transition-all appearance-none cursor-pointer"
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
        {/* Custom chevron icon */}
        <svg
          className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </div>
    </div>
  );
}
