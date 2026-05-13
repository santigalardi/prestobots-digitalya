"use client";

import { useEffect, useRef, useState } from "react";

/* Widget flotante de chat con el bot de PrestoBots.
   - FAB amarillo abajo a la derecha (estilo botón flotante de WhatsApp).
   - Al click se abre un popup con el iPhone-frame y el chat.
   - Captura nombre / clínica / email / teléfono / cantidad de médicos.
   - State machine simple: pregunta → input → siguiente.
   - Al final POST al backend (TODO: endpoint real cuando lo defina el cliente).

   El widget escucha el evento global `prestobots:open-chat` para que cualquier
   CTA de la landing (los `<a href="#form">`) pueda abrirlo. */

type Step =
  | "intro"
  | "name"
  | "clinic"
  | "email"
  | "phone"
  | "doctors"
  | "submitting"
  | "done";

type Answers = {
  name: string;
  clinic: string;
  email: string;
  phone: string;
  doctors: string;
};

type Message = {
  side: "bot" | "user";
  text: string;
  time: string;
};

const DOCTOR_OPTIONS = [
  { value: "1-5", label: "1 a 5" },
  { value: "6-15", label: "6 a 15" },
  { value: "16-50", label: "16 a 50" },
  { value: "50+", label: "Más de 50" },
];

function nowTime() {
  const d = new Date();
  return `${d.getHours().toString().padStart(2, "0")}:${d
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
}

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
}
function isPhone(v: string) {
  return v.replace(/\D/g, "").length >= 8;
}

export default function DemoChatBot() {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState<Step>("intro");
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isTyping, setIsTyping] = useState(false);
  const [unread, setUnread] = useState(0);
  const [answers, setAnswers] = useState<Answers>({
    name: "",
    clinic: "",
    email: "",
    phone: "",
    doctors: "",
  });

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  /* Refs para cancelar timeouts pendientes (evita StrictMode double-fire
     y permite limpiar al desmontar). */
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const hasInitedRef = useRef(false);

  /* Escuchar el evento global para abrir desde cualquier CTA, e
     interceptar todos los clicks a `<a href="#form">` para que en vez
     de scrollear abran el chat. */
  useEffect(() => {
    function onOpen() {
      setOpen(true);
    }
    function onClick(e: MouseEvent) {
      const target = e.target as HTMLElement | null;
      const link = target?.closest('a[href="#form"]') as HTMLAnchorElement | null;
      if (link) {
        e.preventDefault();
        setOpen(true);
      }
    }
    window.addEventListener("prestobots:open-chat", onOpen);
    document.addEventListener("click", onClick);
    return () => {
      window.removeEventListener("prestobots:open-chat", onOpen);
      document.removeEventListener("click", onClick);
    };
  }, []);

  /* Cleanup de timeouts al desmontar */
  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((t) => clearTimeout(t));
      timeoutsRef.current = [];
    };
  }, []);

  /* Auto-scroll al fondo */
  useEffect(() => {
    if (open) {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages, isTyping, open]);

  /* Auto-focus input cuando cambia el step y está abierto */
  useEffect(() => {
    if (
      open &&
      (step === "name" ||
        step === "clinic" ||
        step === "email" ||
        step === "phone")
    ) {
      // Pequeño delay para esperar que termine la animación de apertura
      const t = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(t);
    }
  }, [step, open]);

  /* Mensaje inicial — solo una vez en la vida del componente */
  useEffect(() => {
    if (hasInitedRef.current) return;
    hasInitedRef.current = true;
    typeBot(
      [
        "Hola 👋 Soy el asistente de PrestoBots Salud.",
        "Te ayudo a coordinar la demo en menos de un minuto. ¿Cómo te llamás?",
      ],
      () => setStep("name")
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* Marcar mensajes nuevos como no leídos cuando el chat está cerrado */
  useEffect(() => {
    if (!open && messages.length > 0) {
      const lastBotMessages = messages.filter((m) => m.side === "bot").length;
      setUnread(lastBotMessages);
    } else if (open) {
      setUnread(0);
    }
  }, [messages, open]);

  /* Helper: el bot "tipea" varios mensajes en secuencia.
     Guarda los timeouts en una ref para poder cancelarlos. */
  function typeBot(texts: string[], onDone?: () => void) {
    const queue = [...texts];

    const next = () => {
      if (queue.length === 0) {
        setIsTyping(false);
        onDone?.();
        return;
      }
      const text = queue.shift()!;
      setIsTyping(true);
      const t = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [...prev, { side: "bot", text, time: nowTime() }]);
        const t2 = setTimeout(next, 350);
        timeoutsRef.current.push(t2);
      }, Math.min(1400, 600 + text.length * 8));
      timeoutsRef.current.push(t);
    };
    next();
  }

  function pushUser(text: string) {
    setMessages((prev) => [...prev, { side: "user", text, time: nowTime() }]);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const value = input.trim();
    if (!value) return;

    if (step === "name") {
      pushUser(value);
      setAnswers((a) => ({ ...a, name: value }));
      setInput("");
      const firstName = value.split(" ")[0];
      typeBot(
        [`¡Hola ${firstName}! 🙌`, "¿En qué clínica o institución trabajás?"],
        () => setStep("clinic")
      );
    } else if (step === "clinic") {
      pushUser(value);
      setAnswers((a) => ({ ...a, clinic: value }));
      setInput("");
      typeBot(["Genial. ¿Cuál es tu email corporativo?"], () =>
        setStep("email")
      );
    } else if (step === "email") {
      if (!isEmail(value)) {
        setError("Hmm, ese email no parece válido. ¿Lo revisás?");
        return;
      }
      pushUser(value);
      setAnswers((a) => ({ ...a, email: value }));
      setInput("");
      typeBot(["Perfecto. ¿Y un teléfono o WhatsApp para coordinar?"], () =>
        setStep("phone")
      );
    } else if (step === "phone") {
      if (!isPhone(value)) {
        setError("El teléfono parece incompleto. Probá de nuevo.");
        return;
      }
      pushUser(value);
      setAnswers((a) => ({ ...a, phone: value }));
      setInput("");
      typeBot(
        ["Última pregunta: ¿cuántos médicos atienden en tu clínica?"],
        () => setStep("doctors")
      );
    }
  }

  function handleDoctorChoice(option: { value: string; label: string }) {
    pushUser(option.label);
    setAnswers((a) => ({ ...a, doctors: option.value }));
    setStep("submitting");
    submitToBackend({ ...answers, doctors: option.value });
  }

  async function submitToBackend(data: Answers) {
    typeBot(["Estoy registrando tus datos…"]);
    try {
      // TODO: conectar a HubSpot / endpoint real cuando lo defina el cliente.
      await new Promise((r) => setTimeout(r, 1200));
      void data;

      typeBot(
        [
          "¡Listo! ✅",
          "Un especialista de PrestoBots te va a escribir por WhatsApp en menos de 24 horas para coordinar la demo.",
          "Mientras tanto, si querés podés seguir explorando la landing 👇",
        ],
        () => setStep("done")
      );
    } catch {
      setError("Algo falló. Probá de nuevo en unos minutos.");
      setStep("doctors");
    }
  }

  const placeholder =
    step === "name"
      ? "Tu nombre y apellido"
      : step === "clinic"
      ? "Nombre de la clínica"
      : step === "email"
      ? "tu@email.com"
      : step === "phone"
      ? "+54 11 1234 5678"
      : "Mensaje";

  const inputDisabled =
    step === "intro" ||
    step === "doctors" ||
    step === "submitting" ||
    step === "done" ||
    isTyping;

  return (
    <>
      {/* FAB — botón flotante abajo a la derecha */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Cerrar chat" : "Abrir chat con PrestoBots"}
        aria-expanded={open}
        className={`fixed z-50 bottom-5 right-5 md:bottom-6 md:right-6 group flex items-center justify-center rounded-full shadow-[0_12px_32px_-8px_rgba(255,204,51,0.55),0_4px_12px_rgba(10,10,10,0.18)] transition-all duration-300 ${
          open
            ? "w-12 h-12 bg-ink text-paper-warm hover:bg-ink-soft"
            : "w-16 h-16 bg-brand-yellow text-ink hover:bg-brand-yellow-hover hover:scale-105"
        }`}
      >
        {open ? (
          /* Cerrar (X) */
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M18 6L6 18M6 6l12 12" />
          </svg>
        ) : (
          /* WhatsApp icon */
          <>
            <svg width="30" height="30" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            {/* Badge de no leídos */}
            {unread > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1.5 rounded-full bg-ink text-paper-warm text-[11px] font-bold flex items-center justify-center shadow-md">
                {unread}
              </span>
            )}
            {/* Pulso sutil */}
            <span className="absolute inset-0 rounded-full bg-brand-yellow/40 animate-ping opacity-40 -z-10" />
          </>
        )}
      </button>

      {/* Popup del chat */}
      <div
        className={`fixed z-50 transition-all duration-300 ease-out ${
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-4 pointer-events-none"
        }`}
        style={{
          /* Posicionado arriba del FAB */
          bottom: "5.5rem",
          right: "1.25rem",
        }}
        role="dialog"
        aria-label="Chat con PrestoBots"
        aria-hidden={!open}
      >
        <div className="relative" style={{ width: 340 }}>
          {/* Glow amarillo */}
          <div
            className="absolute -inset-3 -z-10 rounded-[3rem] opacity-50 blur-2xl pointer-events-none"
            style={{
              background:
                "radial-gradient(circle at 70% 30%, rgba(255,204,51,0.35), transparent 60%)",
            }}
          />

          {/* iPhone frame */}
          <div
            className="relative rounded-[44px] p-[2px] shadow-[0_30px_70px_-20px_rgba(10,10,10,0.5),0_0_0_1px_rgba(0,0,0,0.08)]"
            style={{
              background:
                "linear-gradient(135deg, #2a2a2c 0%, #1a1a1c 25%, #0e0e10 50%, #1a1a1c 75%, #2a2a2c 100%)",
            }}
          >
            <div className="rounded-[42px] p-[5px] bg-[#050505]">
              <div
                className="relative bg-[#ECE5DD] rounded-[37px] overflow-hidden flex flex-col"
                style={{ width: 326, height: 540 }}
              >
                {/* Status bar */}
                <div className="relative bg-[#075E54] text-white pt-[14px] pb-1 px-5 flex items-center justify-between text-[10.5px] font-semibold shrink-0">
                  <span className="tabular-nums z-10">{nowTime()}</span>
                  <span className="flex items-center gap-1.5 z-10">
                    <svg width="13" height="9" viewBox="0 0 14 10" fill="currentColor">
                      <rect x="0" y="7" width="2.5" height="3" rx="0.5" />
                      <rect x="3.5" y="5" width="2.5" height="5" rx="0.5" />
                      <rect x="7" y="3" width="2.5" height="7" rx="0.5" />
                      <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" />
                    </svg>
                    <svg width="20" height="9" viewBox="0 0 22 10" fill="none">
                      <rect x="0.5" y="0.5" width="18" height="9" rx="2" stroke="currentColor" strokeWidth="0.8" opacity="0.85" />
                      <rect x="2" y="2" width="14" height="6" rx="0.8" fill="currentColor" />
                      <rect x="19.5" y="3.5" width="1.5" height="3" rx="0.5" fill="currentColor" opacity="0.85" />
                    </svg>
                  </span>
                </div>

                {/* Dynamic Island */}
                <div className="absolute top-[7px] left-1/2 -translate-x-1/2 z-30 w-[88px] h-[24px] rounded-full bg-black shadow-[0_1px_2px_rgba(0,0,0,0.4)]">
                  <span className="absolute right-[7px] top-1/2 -translate-y-1/2 w-[6px] h-[6px] rounded-full bg-[#0a0d12]">
                    <span className="absolute inset-[1px] rounded-full bg-[#1a2840]/60" />
                  </span>
                </div>

                {/* Header del chat */}
                <div className="bg-[#075E54] text-white px-3 pt-0.5 pb-2 flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    aria-label="Cerrar chat"
                    className="text-white/85 hover:text-white shrink-0 -ml-0.5 p-0.5"
                  >
                    <svg width="9" height="14" viewBox="0 0 10 16" fill="none">
                      <path d="M8 1L2 8l6 7" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  <div className="w-8 h-8 rounded-full bg-brand-yellow flex items-center justify-center text-ink font-bold text-[11px] shrink-0">
                    PB
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-[13px] leading-tight truncate">
                      PrestoBots Salud
                    </p>
                    <p className="text-[10px] text-white/75 flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-400 inline-block" />
                      en línea · responde al instante
                    </p>
                  </div>
                </div>

                {/* Cuerpo del chat — flex-1 + overflow */}
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto px-2.5 py-3 space-y-1.5"
                  style={{
                    backgroundColor: "#ECE5DD",
                    backgroundImage:
                      "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 80 80'><g fill='%23d4cdbf' fill-opacity='0.4'><circle cx='8' cy='8' r='1'/><circle cx='40' cy='24' r='1'/><circle cx='64' cy='12' r='1'/><circle cx='20' cy='52' r='1'/><circle cx='56' cy='60' r='1'/><circle cx='72' cy='44' r='1'/></g></svg>\")",
                  }}
                >
                  {messages.map((msg, i) =>
                    msg.text ? (
                      <div
                        key={i}
                        className={`flex bubble-in ${
                          msg.side === "user" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[80%] px-2.5 py-1.5 rounded-lg text-[12.5px] leading-[1.35] shadow-sm ${
                            msg.side === "user"
                              ? "bg-[#DCF8C6] text-ink rounded-br-sm"
                              : "bg-white text-ink rounded-bl-sm"
                          }`}
                        >
                          <p className="whitespace-pre-line">{msg.text}</p>
                          <span className="text-[9px] text-ink/45 float-right ml-2 mt-0.5">
                            {msg.time}
                            {msg.side === "user" && (
                              <span className="text-[#34B7F1] ml-1">✓✓</span>
                            )}
                          </span>
                        </div>
                      </div>
                    ) : null
                  )}

                  {/* Typing indicator */}
                  {isTyping && (
                    <div className="flex justify-start bubble-in">
                      <div className="bg-white/85 px-3 py-2.5 rounded-lg rounded-bl-sm shadow-sm flex items-center gap-1">
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-ink/40 typing-dot"
                          style={{ animationDelay: "0s" }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-ink/40 typing-dot"
                          style={{ animationDelay: "0.2s" }}
                        />
                        <span
                          className="w-1.5 h-1.5 rounded-full bg-ink/40 typing-dot"
                          style={{ animationDelay: "0.4s" }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Botones de opciones (paso doctors) */}
                  {step === "doctors" && !isTyping && (
                    <div className="flex flex-col gap-1.5 pt-2 bubble-in">
                      {DOCTOR_OPTIONS.map((opt) => (
                        <button
                          key={opt.value}
                          type="button"
                          onClick={() => handleDoctorChoice(opt)}
                          className="bg-white text-ink text-[12.5px] px-3 py-2 rounded-lg shadow-sm border border-ink/5 text-left hover:bg-brand-yellow hover:border-brand-yellow transition-colors"
                        >
                          {opt.label}
                        </button>
                      ))}
                    </div>
                  )}

                  {error && (
                    <div className="flex justify-center pt-1">
                      <span className="bg-red-500/10 text-red-700 text-[11px] px-2.5 py-1 rounded-md">
                        {error}
                      </span>
                    </div>
                  )}
                </div>

                {/* Input bar funcional */}
                <form
                  onSubmit={handleSubmit}
                  className="bg-[#F0F0F0] px-2.5 pt-2 pb-3 flex items-center gap-2 shrink-0"
                >
                  <div className="flex-1 bg-white rounded-full px-3 py-1.5 flex items-center gap-2">
                    <input
                      ref={inputRef}
                      type={
                        step === "email"
                          ? "email"
                          : step === "phone"
                          ? "tel"
                          : "text"
                      }
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                        if (error) setError(null);
                      }}
                      disabled={inputDisabled}
                      placeholder={placeholder}
                      className="flex-1 bg-transparent text-[12.5px] text-ink placeholder:text-ink/35 focus:outline-none disabled:opacity-50"
                      aria-label={placeholder}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={inputDisabled || !input.trim()}
                    aria-label="Enviar"
                    className="w-8 h-8 rounded-full bg-[#075E54] flex items-center justify-center disabled:opacity-40 transition-opacity"
                  >
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="white">
                      <path d="M3 3v8l13 1L3 13v8l19-9z" />
                    </svg>
                  </button>
                </form>

                {/* Home indicator — muy sutil dentro del chat */}
                <div className="h-[3px] bg-ink/20 mx-auto w-[80px] rounded-full mb-1 shrink-0" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
