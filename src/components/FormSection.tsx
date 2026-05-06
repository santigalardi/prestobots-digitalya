import Image from "next/image";
import ContactForm from "./ContactForm";

const DELIVERABLES = [
  "Diagnóstico de tu tasa de no-show",
  "Demo del bot funcionando con un caso real",
  "Estimación de ROI para tu clínica específica",
];

export default function FormSection() {
  return (
    <section
      id="form"
      className="relative bg-paper-warm scroll-mt-20 overflow-hidden"
    >
      {/* Glow amarillo difuso decorativo */}
      <div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-20 blur-[140px] pointer-events-none"
        style={{ background: "var(--color-brand-yellow)" }}
      />

      <div className="container-page relative py-20 md:py-28">
        {/* Header — meta-bar consistente */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-ink/10">
          <div className="flex items-center gap-3">
            <span className="relative flex items-center justify-center w-3 h-3">
              <span className="absolute w-3 h-3 rounded-full bg-brand-yellow/40 live-ring" />
              <span className="absolute w-3 h-3 rounded-full bg-brand-yellow/40 live-ring-delayed" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-brand-yellow-deep shadow-[0_0_8px_rgba(255,204,51,0.6)]" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink font-bold">
              Agendá tu demo
            </span>
            <span className="hidden sm:block w-px h-3 bg-ink/15" />
            <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.22em] text-muted">
              Cupos limitados · esta semana
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-faint">
            Respuesta en &lt; 24 horas
          </span>
        </div>

        {/* Layout principal */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Columna izquierda — sticky */}
          <aside className="lg:col-span-5 lg:sticky lg:top-24">
            <h2
              className="text-[36px] sm:text-[44px] lg:text-[52px] font-display leading-[1.05] tracking-[-0.03em] text-heading mb-5"
              style={{ fontWeight: 500 }}
            >
              Vemos tu operación.
              <br />
              <span className="text-muted">
                Te mostramos cuánto podés recuperar.
              </span>
            </h2>

            <p className="text-[16px] md:text-[17px] text-body leading-[1.65] mb-10 max-w-md">
              Una llamada concreta para entender tu flujo actual, ver el bot
              funcionando con un caso real y dejarte un plan claro para
              resolver tu fuga de facturación.
            </p>

            {/* Lo que te llevás */}
            <div className="mb-10">
              <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-faint mb-4 block">
                ▸ Lo que te llevás
              </span>
              <ul className="space-y-3">
                {DELIVERABLES.map((d, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 text-[15px] text-body leading-[1.5]"
                  >
                    <span
                      aria-hidden
                      className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-brand-yellow flex items-center justify-center"
                    >
                      <svg
                        className="w-3 h-3 text-ink"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </span>
                    {d}
                  </li>
                ))}
              </ul>
            </div>

            {/* Bocadillo decorativo más sutil */}
            <Image
              src="/cta-bubble.png"
              alt="¿Te gustaría empezar ahora? Estoy para servirte"
              width={347}
              height={116}
              className="w-full max-w-[260px] h-auto opacity-90"
            />
          </aside>

          {/* Columna derecha — form */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
