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

export default function SobreMi() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const hitos = [
    {
      n: "01",
      texto: "Nutrición pensada para el día a día real, no para el papel",
    },
    {
      n: "02",
      texto: "Movimiento accesible, sin necesidad de gimnasio ni equipo",
    },
    {
      n: "03",
      texto: "Acompañamiento cercano en cada paso, no una app fría",
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
          <Link href="/sobre-mi" className="opacity-60">
            Sobre mí
          </Link>
          <Link href="/proximamente" className="transition-opacity duration-200 hover:opacity-60">
            Próximamente
          </Link>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
        <div className="overflow-hidden">
          <img
            src="https://picsum.photos/seed/ronsel-sobremi-hero/900/1100"
            alt=""
            className="aspect-[4/5] w-full object-cover"
          />
        </div>

        <div
          className={`flex flex-col justify-center transition-all duration-700 ease-out ${
            mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
          }`}
        >
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#5b5b52]">
            Sobre mí
          </p>
          <h1
            className={`${playfair.className} mb-10 italic leading-[1] text-[#1F1E1B]`}
            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)" }}
          >
            Detrás de
            <br />
            Ronsel
          </h1>
          <p className="text-lg leading-relaxed text-[#5b5b52]">
            {/* EDITA: aquí va tu presentación personal — quién eres, 
            desde cuándo te dedicas a esto y qué te llevó a crear Ronsel. */}
            Ronsel nació de una idea sencilla: cuidarse no debería ser
            complicado. Después de años acompañando a personas en su relación
            con la comida y el movimiento, decidí reunir todo lo aprendido en
            un solo espacio, pensado para adaptarse a tu vida — no al revés.
          </p>
        </div>
      </section>

      {/* ============ CITA GRANDE (franja verde) ============ */}
      <section className="bg-[#2F6E68] px-6 py-32">
        <div className="mx-auto max-w-5xl text-center">
          <p
            className={`${playfair.className} italic leading-[1.15] text-white`}
            style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
          >
            {/* EDITA: sustituye por una frase tuya, algo que resuma tu filosofía */}
            "No creo en las dietas que se abandonan a la segunda semana.
            Creo en los hábitos que se quedan."
          </p>
        </div>
      </section>

      {/* ============ MI ENFOQUE ============ */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#5b5b52]">
          Mi enfoque
        </p>
        <h2
          className={`${playfair.className} mb-20 italic leading-[1] text-[#1F1E1B]`}
          style={{ fontSize: "clamp(2.5rem, 5.5vw, 4.5rem)" }}
        >
          Cómo trabajo
          <br />
          contigo
        </h2>

        <div className="grid grid-cols-1 gap-16 sm:grid-cols-3">
          {hitos.map((item) => (
            <div key={item.n} className="flex flex-col gap-6">
              <span className={`${playfair.className} text-4xl italic text-[#2F6E68]/50`}>
                {item.n}
              </span>
              <p className="text-lg leading-relaxed text-[#5b5b52]">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ SEGUNDA FOTO + TEXTO ============ */}
      <section className="grid grid-cols-1 bg-[#1F1E1B] lg:grid-cols-2">
        <div className="overflow-hidden">
          <img
            src="https://picsum.photos/seed/ronsel-sobremi-detalle/900/1100"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-24 sm:px-16">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-white/40">
            Por qué Ronsel
          </p>
          <h2
            className={`${playfair.className} mb-8 italic leading-[1.05] text-white`}
            style={{ fontSize: "clamp(2rem, 4vw, 3.5rem)" }}
          >
            Un ronsel es la
            <br />
            huella que deja
            <br />
            un barco al pasar.
          </h2>
          <p className="text-lg leading-relaxed text-white/70">
            {/* EDITA: si el nombre tiene otro significado o historia para ti, cámbialo aquí */}
            Igual que esa huella, quiero que cada pequeño cambio que hagas
            en tu alimentación y en tu movimiento deje un rastro duradero —
            no una marca que desaparece al día siguiente.
          </p>
        </div>
      </section>

      {/* ============ CTA FINAL ============ */}
      <section className="bg-white px-6 py-32 text-center">
        <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#5b5b52]">
          ¿Empezamos?
        </p>
        <h2
          className={`${playfair.className} mb-12 italic leading-[1] text-[#1F1E1B]`}
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}
        >
          Elige tu camino
        </h2>
        <Link
          href="/#planes"
          className="inline-block border border-[#1F1E1B] px-10 py-4 text-sm uppercase tracking-[0.3em] text-[#1F1E1B] transition-colors duration-300 hover:bg-[#1F1E1B] hover:text-white"
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