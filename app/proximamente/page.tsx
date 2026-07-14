"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Great_Vibes, Playfair_Display } from "next/font/google";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export default function Proximamente() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const adelantos = [
    {
      n: "01",
      texto: "Nuevos vídeos de Gimnasia Funcional",
    },
    {
      n: "02",
      texto: "Retos mensuales para mantener la motivación",
    },
    {
      n: "03",
      texto: "Contenido exclusivo para la comunidad Ronsel",
    },
  ];

  return (
    <div className="min-h-screen bg-[#FBF3E7] text-[#1F1E1B]">
      {/* ============ NAVEGACIÓN ============ */}
      <nav>
        <div className="flex items-center justify-center px-6 pt-12 pb-8">
          <Link href="/" className={`${greatVibes.className} text-6xl text-[#2F6E68]`}>
            Ronsel
          </Link>
        </div>

        <div className="flex items-center justify-center gap-14 border-t border-b border-black/10 px-6 py-5 text-sm uppercase tracking-[0.3em] text-[#1F1E1B]">
          <div className="group relative">
            <button className="transition-opacity duration-200 hover:opacity-60">
              Suscripciones
            </button>
            <div className="invisible absolute left-1/2 top-full z-10 -translate-x-1/2 pt-6 opacity-0 transition-all duration-200 group-hover:visible group-hover:opacity-100">
              <div className="flex flex-col gap-5 whitespace-nowrap bg-[#FBF3E7] px-10 py-8">
                <Link href="/empieza" className="tracking-[0.2em] text-[#1F1E1B] transition-opacity duration-200 hover:opacity-60">
                  Empieza
                </Link>
                <Link href="/avanza" className="tracking-[0.2em] text-[#1F1E1B] transition-opacity duration-200 hover:opacity-60">
                  Avanza
                </Link>
                <Link href="/transforma" className="tracking-[0.2em] text-[#1F1E1B] transition-opacity duration-200 hover:opacity-60">
                  Transforma
                </Link>
              </div>
            </div>
          </div>
          <Link href="/sobre-mi" className="transition-opacity duration-200 hover:opacity-60">
            Sobre mí
          </Link>
          <Link href="/proximamente" className="opacity-60">
            Próximamente
          </Link>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="mx-auto flex max-w-5xl flex-col items-center px-6 py-32 text-center">
        <p
          className={`mb-6 text-sm uppercase tracking-[0.35em] text-[#5b5b52] transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Muy pronto
        </p>
        <h1
          className={`${playfair.className} mb-10 italic leading-[1] text-[#1F1E1B] transition-all delay-100 duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
          style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
        >
          Estamos preparando
          <br />
          algo nuevo
        </h1>
        <p
          className={`max-w-xl text-lg leading-relaxed text-[#5b5b52] transition-all delay-200 duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          Estamos trabajando en nuevas formas de acompañarte en tu día a día.
          Déjanos tu email y serás de las primeras personas en enterarte
          cuando esté listo.
        </p>
      </section>

      {/* ============ FORMULARIO DE AVISO (sin funcionalidad todavía) ============ */}
      <section className="bg-[#2F6E68] px-6 py-24">
        <div className="mx-auto max-w-xl">
          <p className="mb-6 text-center text-sm uppercase tracking-[0.35em] text-white/70">
            Avísame cuando esté listo
          </p>
          {/* TODO: este formulario aún no envía datos a ningún sitio. 
              Se conectará más adelante, junto con Supabase. */}
          <form className="flex flex-col gap-4 sm:flex-row sm:gap-0">
            <input
              type="email"
              placeholder="Tu email"
              className="w-full border-b border-white/40 bg-transparent px-2 py-4 text-lg text-white placeholder-white/50 outline-none sm:border-b sm:border-r-0"
            />
            <button
              type="button"
              className="whitespace-nowrap border border-white px-8 py-4 text-sm uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:bg-white hover:text-[#2F6E68]"
            >
              Avísame
            </button>
          </form>
        </div>
      </section>

      {/* ============ ADELANTOS ============ */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#5b5b52]">
          Un pequeño adelanto
        </p>
        <h2
          className={`${playfair.className} mb-20 italic leading-[1] text-[#1F1E1B]`}
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
        >
          Lo que viene
        </h2>

        <div className="grid grid-cols-1 border-t border-black/10 sm:grid-cols-3">
          {adelantos.map((item) => (
            <div
              key={item.n}
              className="border-b border-black/10 px-2 py-10 sm:border-r sm:px-8 sm:last:border-r-0"
            >
              <span className={`${playfair.className} mb-6 block text-4xl italic text-[#2F6E68]/50`}>
                {item.n}
              </span>
              <p className="text-lg leading-relaxed text-[#5b5b52]">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="bg-[#1F1E1B] px-6 py-32 text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.35em] text-white/40">
          Mientras tanto
        </p>
        <h2
          className={`${playfair.className} mb-12 italic leading-[1] text-white`}
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Descubre lo que
          <br />
          ya tenemos listo
        </h2>
        <Link
          href="/#planes"
          className="inline-block border border-white px-10 py-4 text-sm uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:bg-white hover:text-[#1F1E1B]"
        >
          Ver suscripciones
        </Link>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#1F1E1B] px-6 py-24 text-white/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 sm:grid-cols-4">
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white">
              Novedades Ronsel
            </p>
            <div className="flex border-b border-white/25 pb-3">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full bg-transparent text-lg text-white placeholder-white/40 outline-none"
              />
              <button className="text-xl text-white">→</button>
            </div>
          </div>
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white">Planes</p>
            <ul className="flex flex-col gap-3 text-lg">
              <li><Link href="/empieza" className="transition-opacity hover:opacity-60">Empieza</Link></li>
              <li><Link href="/avanza" className="transition-opacity hover:opacity-60">Avanza</Link></li>
              <li><Link href="/transforma" className="transition-opacity hover:opacity-60">Transforma</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white">Ayuda</p>
            <ul className="flex flex-col gap-3 text-lg">
              <li><Link href="/formulario" className="transition-opacity hover:opacity-60">Contacto</Link></li>
              <li><Link href="#" className="transition-opacity hover:opacity-60">Preguntas frecuentes</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white">Ronsel</p>
            <p className="text-base">Texto de footer pendiente de redactar.</p>
          </div>
        </div>
        <p className="mx-auto mt-20 max-w-7xl text-sm text-white/30">
          © 2026 Ronsel. Todos los derechos reservados.
        </p>
      </footer>
    </div>
  );
}