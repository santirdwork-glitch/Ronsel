"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";

const greatVibes = Great_Vibes({
  subsets: ["latin"],
  weight: "400",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
});

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const planes = [
    { nombre: "Empieza", precio: "9,99", subtitulo: "Aprende a comer mejor, a tu ritmo", color: "#E8836C", foto: "https://picsum.photos/seed/ronsel-home-empieza/600/700", href: "/empieza" },
    { nombre: "Avanza", precio: "19,99", subtitulo: "Alimentación + Pilates en casa", color: "#2F6E68", foto: "https://picsum.photos/seed/ronsel-home-avanza/600/700", href: "/avanza" },
    { nombre: "Transforma", precio: "29,99", subtitulo: "Acompañamiento completo, cada día", color: "#E2A63C", foto: "https://picsum.photos/seed/ronsel-home-transforma/600/700", href: "/transforma" },
  ];

  const valores = [
    { n: "01", texto: "Adaptado a tu día a día" },
    { n: "02", texto: "Menús y clases nuevas cada semana" },
    { n: "03", texto: "Todo desde casa, sin horarios fijos" },
    { n: "04", texto: "Acompañamiento cercano y real" },
  ];

  const enfoque = ["Nutrición", "Movimiento", "Hábitos", "Motivación", "Organización", "Acompañamiento"];

  const publico = [
    "Personas con poco tiempo que quieren comer mejor sin complicarse",
    "Quienes quieren moverse desde casa, sin ir al gimnasio",
    "Personas que ya han probado dietas rígidas y buscan algo sostenible",
    "Quienes valoran la constancia por encima de los resultados rápidos",
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
          <Link href="/empieza" className="transition-opacity duration-200 hover:opacity-60">Empieza</Link>
          <Link href="/avanza" className="transition-opacity duration-200 hover:opacity-60">Avanza</Link>
          <Link href="/transforma" className="transition-opacity duration-200 hover:opacity-60">Transforma</Link>
        </div>
      </nav>

      {/* ============ HERO ============ */}
      <section className="relative h-[92vh] min-h-[620px] w-full overflow-hidden">
        <img
          src="https://picsum.photos/seed/ronsel-home-hero/1600/1200"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

        <div className={`relative z-10 flex h-full flex-col justify-end px-6 pb-20 transition-all duration-700 ease-out sm:px-16 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <p className="mb-4 text-sm uppercase tracking-[0.35em] text-white/80">
            Nutrición — Pilates — Bienestar
          </p>
          <h1 className={`${playfair.className} mb-6 max-w-2xl italic leading-[1.05] text-white`} style={{ fontSize: "clamp(2.5rem, 5.5vw, 5rem)" }}>
            Pequeñas decisiones, grandes cambios
          </h1>
          <p className="mb-10 max-w-md text-lg leading-relaxed text-white/85">
            Menús, recetas y clases de Pilates pensadas para adaptarse a tu vida real — sin dietas imposibles ni rutinas que no puedes sostener.
          </p>
          <Link href="#planes" className="w-fit border border-white px-9 py-4 text-sm uppercase tracking-[0.3em] text-white transition-colors duration-300 hover:bg-white hover:text-[#1F1E1B]">
            Elige tu plan
          </Link>
        </div>
      </section>

      {/* ============ FRANJA DE VALORES ============ */}
      <section className="bg-[#2F6E68] px-6 py-16">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 sm:grid-cols-4">
          {valores.map((item) => (
            <div key={item.texto} className="flex flex-col gap-6">
              <span className={`${playfair.className} text-3xl italic text-white/50`}>{item.n}</span>
              <p className="text-lg leading-snug text-white">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ============ "NO ES UNA DIETA" ============ */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <div className="overflow-hidden">
          <img
            src="https://picsum.photos/seed/ronsel-home-turning-point/1000/1200"
            alt=""
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex flex-col justify-center px-6 py-20 lg:px-24">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#5b5b52]">Esto no es una dieta más</p>
          <h2 className={`${playfair.className} mb-10 italic leading-[1] text-[#1F1E1B]`} style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
            Es tu punto <br /> de partida.
          </h2>
          <p className="mb-4 text-lg leading-relaxed text-[#5b5b52]">
            Has probado dietas que no duran y rutinas que abandonas a la segunda semana.
          </p>
          <p className="mb-10 text-lg leading-relaxed text-[#5b5b52]">
            En Ronsel te ayudamos a construir hábitos que sí se sostienen, combinando alimentación real y movimiento a tu ritmo.
          </p>
          <Link href="#planes" className="group flex w-fit items-center gap-4 text-sm uppercase tracking-[0.3em] text-[#2F6E68]">
            Descubre los planes
            <span className="h-px w-10 bg-[#2F6E68] transition-all duration-300 group-hover:w-16" />
          </Link>
        </div>
      </section>

      {/* ============ ENFOQUE INTEGRAL ============ */}
      <section className="bg-[#1F1E1B] px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-sm uppercase tracking-[0.35em] text-white/40">Nuestro enfoque</p>
          <h2 className={`${playfair.className} mb-20 italic leading-[1] text-white`} style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            Bienestar, sin <br /> fragmentos.
          </h2>
          <div className="grid grid-cols-1 border-t border-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {enfoque.map((item, i) => (
              <div key={item} className="border-b border-white/15 px-2 py-8 sm:border-r sm:px-8">
                <span className="mr-4 text-sm text-white/40">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-xl text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ PARA QUIÉN ES ESTO ============ */}
      <section className="mx-auto max-w-7xl px-6 py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:gap-24">
          <div className="flex flex-col justify-center">
            <p className="mb-6 text-sm uppercase tracking-[0.35em] text-[#5b5b52]">Pensado para ti</p>
            <h2 className={`${playfair.className} mb-10 italic leading-[1] text-[#1F1E1B]`} style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)" }}>
              ¿Es Ronsel <br /> para mí?
            </h2>
            <div className="flex flex-col">
              {publico.map((item, i) => (
                <div key={item} className="flex gap-6 border-t border-black/10 py-6 last:border-b">
                  <span className="text-sm text-[#5b5b52]">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-lg leading-relaxed text-[#5b5b52]">{item}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="overflow-hidden">
            <img src="https://picsum.photos/seed/ronsel-home-publico/1000/1200" alt="" className="aspect-[4/5] w-full object-cover" />
          </div>
        </div>
      </section>

      {/* ============ PLANES ANIMADOS ============ */}
      <section id="planes" className="bg-white px-6 py-32">
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-center text-sm uppercase tracking-[0.35em] text-[#5b5b52]">Suscripciones</p>
          <h2 className={`${playfair.className} mb-24 text-center italic leading-[1] text-[#1F1E1B]`} style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)" }}>
            Elige tu camino
          </h2>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {planes.map((plan) => (
              <motion.div
                key={plan.nombre}
                whileHover={{ y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Link href={plan.href} className="group flex flex-col bg-white border border-black/5 shadow-sm hover:shadow-2xl transition-shadow duration-500">
                  <div className="overflow-hidden">
                    <motion.img 
                      src={plan.foto} 
                      alt="" 
                      className="aspect-[4/5] w-full object-cover grayscale transition-all duration-700 ease-out group-hover:grayscale-0"
                      whileHover={{ scale: 1.05 }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-between p-10">
                    <div>
                      <p className={`${playfair.className} mb-2 text-3xl italic`} style={{ color: plan.color }}>{plan.nombre}</p>
                      <p className="text-base text-[#5b5b52]">{plan.subtitulo}</p>
                    </div>
                    <p className="mt-10 text-lg font-medium text-[#1F1E1B]">
                      {plan.precio}€ <span className="text-sm font-normal text-[#5b5b52]">/mes</span>
                    </p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#1F1E1B] px-6 py-24 text-white/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 sm:grid-cols-4">
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white">Novedades Ronsel</p>
            <div className="flex border-b border-white/25 pb-3">
              <input type="email" placeholder="Tu email" className="w-full bg-transparent text-lg text-white placeholder-white/40 outline-none" />
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
        <p className="mx-auto mt-20 max-w-7xl text-sm text-white/30">© 2026 Ronsel. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}