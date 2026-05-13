"use client";

import Image from "next/image";

const NAV_LINKS = [
  { href: "#pilares", label: "Beneficios" },
  { href: "#producto", label: "Producto" },
  { href: "#testimonios", label: "Testimonios" },
];

function scrollToTop(e: React.MouseEvent<HTMLAnchorElement>) {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

export default function NavBar() {
  return (
    <header className="sticky top-0 z-40 bg-bg/80 backdrop-blur-md border-b border-paper-line">
      <div className="container-page flex items-center justify-between py-4">
        <a
          href="#top"
          onClick={scrollToTop}
          className="flex items-center gap-2.5 cursor-pointer"
          aria-label="PrestoBots — volver arriba"
        >
          <Image
            src="/logos/prestobots.png"
            alt="PrestoBots"
            width={229}
            height={70}
            className="h-11"
            style={{ width: "auto" }}
            priority
          />
        </a>

        <div className="flex items-center gap-6 md:gap-8">
          <nav className="hidden md:flex items-center gap-7">
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-[14px] text-body hover:text-ink transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>
          <a
            href="#form"
            className="hidden sm:inline-flex items-center gap-2 bg-ink text-paper-warm font-medium px-5 py-2.5 rounded-full hover:bg-ink-soft transition-colors text-[14px]"
          >
            Agendar demo
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
}
