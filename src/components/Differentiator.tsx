import Image from "next/image";

const DIFFERENTIATORS = [
  {
    n: "01",
    title: "Especialización vertical en salud.",
    contrast: "No somos un bot genérico adaptado a clínicas.",
  },
  {
    n: "02",
    title: "Integración nativa con el HIS Geclisa.",
    contrast: "No es una capa que pelea con tu sistema.",
  },
  {
    n: "03",
    title: "Automatización completa del ciclo del turno.",
    contrast: "No resolvemos solo una pieza del flujo.",
  },
  {
    n: "04",
    title: "6 años de datos reales en clínicas operando.",
    contrast: "No una promesa de roadmap.",
  },
];

export default function Differentiator() {
  return (
    <section className="relative bg-ink text-paper-warm overflow-hidden">
      {/* Glow amarillo difuso superior izquierdo */}
      <div
        className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full opacity-15 blur-[140px] pointer-events-none"
        style={{ background: "var(--color-brand-yellow)" }}
      />

      {/* Grid de puntos */}
      <div className="absolute inset-0 bg-dot-grid opacity-50 pointer-events-none" />

      <div className="container-page relative py-20 md:py-28">
        {/* Header — meta-bar consistente */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-6 mb-12 border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-brand-yellow font-bold">
              Por qué PrestoBots
            </span>
            <span className="hidden sm:block w-px h-3 bg-white/20" />
            <span className="hidden sm:block font-mono text-[11px] uppercase tracking-[0.22em] text-white/60">
              4 diferenciales no replicables
            </span>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-white/40">
            Análisis competitivo · 2026
          </span>
        </div>

        {/* Layout: titular + lista a la izquierda · ilustración a la derecha */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Columna izquierda */}
          <div className="lg:col-span-7">
            <h2
              className="text-[40px] sm:text-[52px] lg:text-[64px] font-display leading-[1.02] tracking-[-0.03em] text-white mb-12 md:mb-16"
              style={{ fontWeight: 500 }}
            >
              El único que combina
              <br />
              <span className="text-white/50">los cuatro que importan.</span>
            </h2>

            <ul>
              {DIFFERENTIATORS.map((d, i) => (
                <li
                  key={d.n}
                  className={`group grid grid-cols-[auto_1fr] gap-x-6 md:gap-x-8 items-start py-5 md:py-6 ${
                    i !== 0 ? "border-t border-white/10" : ""
                  }`}
                >
                  <span
                    className="font-display text-[28px] md:text-[36px] leading-none text-brand-yellow tabular-nums tracking-[-0.03em] group-hover:text-brand-yellow-hover transition-colors"
                    style={{ fontWeight: 600 }}
                  >
                    {d.n}
                  </span>
                  <div>
                    <p
                      className="text-[18px] md:text-[20px] font-display leading-[1.3] tracking-[-0.02em] text-white mb-1"
                      style={{ fontWeight: 500 }}
                    >
                      {d.title}
                    </p>
                    <p className="text-[14px] md:text-[15px] text-white/55 leading-[1.5]">
                      {d.contrast}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna derecha — ilustración */}
          <div className="lg:col-span-5 relative">
            {/* Halo amarillo difuso detrás */}
            <div
              className="absolute inset-0 -z-10 opacity-30 blur-3xl"
              style={{
                background:
                  "radial-gradient(circle at 50% 40%, rgba(255,204,51,0.4), transparent 60%)",
              }}
            />
            <Image
              src="/illustration-analytics.png"
              alt="Análisis y datos estratégicos PrestoBots"
              width={1123}
              height={1094}
              className="w-full h-auto max-w-md mx-auto"
            />
          </div>
        </div>

        {/* Footer — cita comparativa al pie */}
        <div className="mt-12 md:mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row md:items-center md:justify-between gap-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 max-w-xl">
            Vs. competencia generalista, vs. soluciones enlatadas y vs. promesas
            sin tracción real.
          </p>
          <a
            href="#form"
            className="inline-flex items-center gap-2 bg-brand-yellow text-ink font-bold px-6 py-3.5 rounded-full hover:bg-brand-yellow-hover transition-colors text-[14px] self-start md:self-auto"
          >
            Ver demo en vivo
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
