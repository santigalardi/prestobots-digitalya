import Image from "next/image";

/* Datos validados del playbook DigitalYa (CLAUDE.md). NO inventar números. */
const TICKER_ITEMS = [
  "200.847 chats procesados este mes",
  "+1M turnos gestionados desde 2020",
  "80% de autogestión real",
  "Integrado nativamente a Geclisa",
  "6 años operando en clínicas argentinas",
  "+200 instituciones en la red Macena",
];

/* KPIs que aparecen como "dossier strip" debajo del hero */
const KPIS = [
  { number: "1.000.000+", label: "turnos\ngestionados", caption: "DESDE 2020" },
  { number: "200.000+", label: "chats\nprocesados/mes", caption: "VOLUMEN ACTUAL" },
  { number: "80%", label: "autogestión\nsin humanos", caption: "TASA REAL" },
  { number: "6", label: "años en\nsalud B2B", caption: "EXPERIENCIA" },
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-bg">
      {/* Ticker LIVE — debajo del navbar */}
      <div className="border-b border-paper-line">
        <div className="container-page py-2.5 flex items-center gap-4">
          <span className="flex items-center gap-3 shrink-0">
            <span className="relative flex items-center justify-center w-3 h-3">
              <span className="absolute w-3 h-3 rounded-full bg-brand-yellow/40 live-ring" />
              <span className="absolute w-3 h-3 rounded-full bg-brand-yellow/40 live-ring-delayed" />
              <span className="relative w-1.5 h-1.5 rounded-full bg-brand-yellow live-core shadow-[0_0_8px_rgba(255,204,51,0.8)]" />
            </span>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink font-bold">
              Live
            </span>
          </span>
          <span className="hidden sm:block w-px h-3 bg-paper-line" />
          <div className="flex-1 overflow-hidden relative">
            <div className="marquee">
              {[...TICKER_ITEMS, ...TICKER_ITEMS].map((item, i) => (
                <span
                  key={i}
                  className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted px-6 whitespace-nowrap"
                >
                  ▸ {item}
                </span>
              ))}
            </div>
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg to-transparent pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Contenido principal del hero */}
      <div className="container-page relative pt-14 pb-20 md:pt-24 md:pb-32">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Columna izquierda — titular editorial */}
          <div className="lg:col-span-7">
            <p className="label-mono mb-6 rise rise-1">
              <span className="text-ink font-bold">Vertical Salud</span>
              <span className="text-faint mx-2">·</span>
              <span>Para directores y gerentes operativos</span>
            </p>

            <h1
              className="text-[44px] sm:text-[56px] lg:text-[72px] font-display leading-[1.02] tracking-[-0.03em] text-heading mb-8 rise rise-2"
              style={{ fontWeight: 600 }}
            >
              Recuperá la
              <br />
              facturación que tu
              <br />
              <span className="highlight-marker">agenda pierde</span>
              <br />
              <span className="text-muted" style={{ fontWeight: 400 }}>
                en silencio.
              </span>
            </h1>

            <p className="text-[17px] md:text-[19px] text-body leading-[1.55] max-w-[560px] mb-10 rise rise-3">
              Bot de WhatsApp con IA, integrado nativamente a tu HIS. Automatiza el
              ciclo completo del turno, audita cada interacción y elimina la fuga de
              ingresos que tus planillas no pueden ver.
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-12 rise rise-4">
              <a href="#form" className="btn-yellow group">
                Agendar diagnóstico gratuito
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
              </a>
              <a href="#producto" className="btn-ghost">
                Ver el producto
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12l7 7 7-7" />
                </svg>
              </a>
            </div>

            {/* Mini-firma estilo editorial */}
            <div className="flex items-center gap-3 text-[13px] text-muted rise rise-5">
              <div className="flex -space-x-2">
                {["#FFCC33", "#0a0a0a", "#1d6b3d", "#f6f3ec"].map((color, i) => (
                  <span
                    key={i}
                    className="w-7 h-7 rounded-full border-2 border-bg"
                    style={{ background: color }}
                  />
                ))}
              </div>
              <span>
                <strong className="text-ink font-semibold">+200 clínicas</strong>{" "}
                ya operan con PrestoBots
              </span>
            </div>
          </div>

          {/* Columna derecha — mockup del producto, limpio */}
          <div className="lg:col-span-5 relative rise rise-3">
            {/* Anotación derecha — narrativa del producto */}
            <div className="hidden lg:block absolute top-1/2 -right-4 z-20">
              <div className="bg-ink text-bg px-3.5 py-2.5 rounded-lg font-mono text-[10px] uppercase tracking-wider max-w-[180px] shadow-lg">
                <span className="block text-brand-yellow font-bold mb-0.5">+ $ recuperado</span>
                Hueco en agenda reasignado en 23s
              </div>
            </div>

            {/* Frame del mockup — minimal */}
            <div className="relative">
              <Image
                src="/illustrations/mockup-mobile.png"
                alt="Bot de PrestoBots conversando con un paciente y reagendando un turno automáticamente"
                width={667}
                height={800}
                className="w-full h-auto max-w-[460px] mx-auto block"
                priority
              />
            </div>
          </div>
        </div>
      </div>

      {/* Strip de KPIs — datos primero (prueba cuantitativa) */}
      <div className="border-t border-paper-line bg-bg">
        <div className="container-page py-8 md:py-10">
          <div className="flex items-center justify-between mb-6">
            <span className="label-mono">
              <span className="text-ink font-bold">Benchmark</span> · 2020 — 2026
            </span>
            <span className="hidden sm:flex items-center gap-2 label-mono">
              Datos auditados internamente
              <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                <circle cx="5" cy="5" r="4" fill="none" stroke="currentColor" strokeWidth="0.8" />
                <path d="M3 5l1.5 1.5L7 4" stroke="currentColor" strokeWidth="1" fill="none" />
              </svg>
            </span>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-y-8 gap-x-6 lg:gap-x-12">
            {KPIS.map((kpi, i) => (
              <div
                key={kpi.caption}
                className={`relative ${
                  i > 0 ? "lg:pl-12 lg:border-l border-paper-line" : ""
                } ${i === 1 || i === 3 ? "pl-6 border-l border-paper-line lg:pl-12" : ""}`}
              >
                <div className="font-mono text-[10px] uppercase tracking-[0.2em] text-faint mb-2">
                  {kpi.caption}
                </div>
                <div
                  className="font-display text-[32px] md:text-[40px] lg:text-[44px] leading-none text-ink mb-2 tracking-[-0.04em] tabular-nums"
                  style={{ fontWeight: 600 }}
                >
                  {kpi.number}
                </div>
                <div className="text-[13px] text-body whitespace-pre-line leading-snug">
                  {kpi.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Franja de clientes — social proof al final del hero, transición al Problem */}
      <div className="border-t border-paper-line bg-bg">
        <div className="container-page py-8 flex flex-col md:flex-row md:items-center gap-6 md:gap-10">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted shrink-0 md:max-w-[140px] md:border-r md:border-paper-line md:pr-10">
            Confían en
            <br className="hidden md:block" />
            <span className="text-ink font-bold">PrestoBots Salud</span>
          </span>

          <div className="flex-1 overflow-hidden relative">
            <div className="marquee items-center gap-12 md:gap-16">
              {[
                { name: "Clínica Modelo Lanús", src: "/logos/lanus.png", h: 36 },
                { name: "CITO", src: "/logos/cito.png", h: 28 },
                { name: "Asistir Servicios Médicos", src: "/logos/asistir.png", h: 32 },
                { name: "Sanatorio de la Ciudad", src: "/logos/sanatorio-ciudad.png", h: 26 },
                { name: "Centrovisión", src: "/logos/centrovision.png", h: 32 },
                { name: "Sanatorio San Carlos", src: "/logos/san-carlos.png", h: 30 },
                /* Duplicado para loop continuo */
                { name: "Clínica Modelo Lanús", src: "/logos/lanus.png", h: 36 },
                { name: "CITO", src: "/logos/cito.png", h: 28 },
                { name: "Asistir Servicios Médicos", src: "/logos/asistir.png", h: 32 },
                { name: "Sanatorio de la Ciudad", src: "/logos/sanatorio-ciudad.png", h: 26 },
                { name: "Centrovisión", src: "/logos/centrovision.png", h: 32 },
                { name: "Sanatorio San Carlos", src: "/logos/san-carlos.png", h: 30 },
              ].map((c, i) => (
                <div
                  key={i}
                  className="shrink-0 flex items-center justify-center"
                  style={{ height: 40 }}
                >
                  <Image
                    src={c.src}
                    alt={c.name}
                    width={c.h * 4}
                    height={c.h}
                    className="opacity-60 hover:opacity-100 transition-opacity duration-200"
                    style={{
                      width: "auto",
                      height: c.h,
                      filter: "invert(1) brightness(0)",
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-bg to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-bg to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
