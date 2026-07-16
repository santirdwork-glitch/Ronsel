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
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const COLOR = "#2F6E68";

function AccordionItem({ title, detail }: { title: string; detail: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/10 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-start justify-between gap-6 text-left text-lg text-[#1F1E1B]"
      >
        <span className="flex items-start gap-4">
          <span style={{ color: COLOR }}>✓</span>
          {title}
        </span>
        <span
          className={`shrink-0 text-[#5b5b52] transition-transform duration-300 ease-in-out ${
            open ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </button>

      <div
        className="grid overflow-hidden transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="mt-2 pl-8 text-base leading-relaxed text-[#5b5b52]">
            {detail}
          </p>
        </div>
      </div>
    </div>
  );
}

function FaqItem({ pregunta, respuesta }: { pregunta: string; respuesta: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-black/10 py-6">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-6 text-left text-lg font-medium text-[#1F1E1B]"
      >
        {pregunta}
        <span
          className={`shrink-0 text-[#5b5b52] transition-transform duration-300 ease-in-out ${
            open ? "rotate-180" : ""
          }`}
        >
          ⌄
        </span>
      </button>

      <div
        className="grid overflow-hidden transition-all duration-300 ease-in-out"
        style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
      >
        <div className="overflow-hidden">
          <p className="mt-3 text-base leading-relaxed text-[#5b5b52]">
            {respuesta}
          </p>
        </div>
      </div>
    </div>
  );
}

export default function Avanza() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const incluye = [
    { titulo: "3 vídeos nuevos de Pilates cada semana", detalle: "Contenido fresco cada semana, para que siempre tengas algo nuevo que practicar." },
    { titulo: "Clases grabadas para realizar en casa en cualquier momento", detalle: "Sin horarios fijos: entrenas cuando mejor te venga, a tu ritmo." },
    { titulo: "Ejercicios enfocados en mejorar la movilidad, la postura y el bienestar general", detalle: "Rutinas pensadas para cuidar el cuerpo en el día a día, no solo para entrenar." },
  ];

  const pasos = [
    { titulo: "Te registras", detalle: "Rellenas el formulario con tus datos y eliges el plan Avanza." },
    { titulo: "Activamos tu acceso", detalle: "Te enviamos las instrucciones para completar el pago por Bizum. En cuanto lo recibimos, activamos tu acceso en menos de 24h." },
    { titulo: "Empiezas a recibir contenido", detalle: "Cada semana tendrás tu menú, tus recetas y tus nuevos vídeos de Pilates listos en tu zona de clientes." },
  ];

  const faqs = [
    { pregunta: "¿Avanza incluye también los menús y recetas de Empieza?", respuesta: "Sí, Avanza incluye todo el contenido de Empieza (menús, recetas, guías) además de los vídeos de Pilates." },
    { pregunta: "¿Necesito material o equipo especial para las clases?", respuesta: "No, las clases están pensadas para hacerse en casa con lo mínimo, como mucho una esterilla." },
    { pregunta: "¿Puedo cancelar cuando quiera?", respuesta: "Sí, no hay permanencia. Puedes darte de baja el mes que quieras, sin compromiso." },
    { pregunta: "¿En cuánto tiempo tengo acceso tras pagar?", respuesta: "En menos de 24 horas desde que confirmamos el Bizum, activamos tu acceso a la zona de clientes." },
  ];

  const otrosPlanes = [
    { nombre: "Empieza", subtitulo: "Aprende a comer mejor, a tu ritmo", foto: "https://picsum.photos/seed/ronsel-empieza/500/500", href: "/empieza" },
    { nombre: "Transforma", subtitulo: "Acompañamiento completo", foto: "https://picsum.photos/seed/ronsel-transforma/500/500", href: "/transforma" },
  ];

  return (
    <div className="min-h-screen bg-[#FBF3E7]">
      {/* ============ NAVEGACIÓN ============ */}
      <nav className="flex items-center justify-between border-b border-black/10 px-6 py-4">
        <Link href="/" className={`${greatVibes.className} text-3xl text-[#2F6E68]`}>
          Ronsel
        </Link>
        <div className="hidden gap-10 text-sm uppercase tracking-widest text-[#5b5b52] sm:flex">
          <Link href="/empieza" className="transition-colors duration-200 hover:text-[#1F1E1B]">Empieza</Link>
          <Link href="/avanza" className="text-[#1F1E1B]">Avanza</Link>
          <Link href="/transforma" className="transition-colors duration-200 hover:text-[#1F1E1B]">Transforma</Link>
        </div>
        <Link href="/formulario" className="text-sm uppercase tracking-widest text-[#5b5b52] transition-colors duration-200 hover:text-[#1F1E1B]">
          Contacto
        </Link>
      </nav>

      {/* ============ HERO DE PRODUCTO ============ */}
      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 py-20 lg:grid-cols-2 lg:gap-20">
        <div className="overflow-hidden rounded-2xl">
          <video
            src="/images/avanza/video-pag-avanza.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 ease-out hover:scale-105"
          />
        </div>

        <div className={`flex flex-col justify-center transition-all duration-700 ease-out ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#5b5b52]">Planes · Avanza</p>
          <h1 className={`${playfair.className} mb-6 italic leading-[1] text-[#1F1E1B]`} style={{ fontSize: "clamp(2.75rem, 5.5vw, 5.5rem)" }}>
            Avanza
          </h1>
          <p className="mb-3 text-lg leading-relaxed text-[#5b5b52]">
            Dirigida a personas que, además de mejorar su alimentación, quieren incorporar el ejercicio a su rutina desde casa de forma cómoda y adaptada a cualquier nivel.
          </p>
          <p className="mb-8 text-lg font-medium text-[#1F1E1B]">
            Todo el contenido de la suscripción Empieza, además de:
          </p>

          <div className="border-t border-black/10">
            {incluye.map((item) => (
              <AccordionItem key={item.titulo} title={item.titulo} detail={item.detalle} />
            ))}
          </div>

          <Link href="/formulario?plan=Avanza" className="mt-10 flex items-center justify-center rounded-full py-5 text-sm font-medium uppercase tracking-widest text-white transition-all duration-300 ease-out hover:opacity-90" style={{ backgroundColor: COLOR }}>
            Quiero apuntarme — 19,99€/mes
          </Link>

          <div className="mt-10 grid grid-cols-2 gap-6 border-t border-black/10 pt-6 text-base text-[#5b5b52]">
            <div>
              <p className="mb-1 font-semibold text-[#1F1E1B]">Activación</p>
              <p>Acceso a tu zona de clientes en menos de 24h tras el pago.</p>
            </div>
            <div className="border-l border-black/10 pl-6">
              <p className="mb-1 font-semibold text-[#1F1E1B]">Cancelación</p>
              <p>Sin permanencia. Cancela el mes que quieras.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ DESCRIPCIÓN DETALLADA ============ */}
      <section className="grid grid-cols-1 bg-[#2F6E68] lg:grid-cols-2">
        <div className="overflow-hidden">
          <img src="https://picsum.photos/seed/ronsel-avanza-detalle/900/1100" alt="" className="h-full w-full object-cover transition-transform duration-500 ease-out hover:scale-105" />
        </div>

        <div className="flex flex-col justify-center px-6 py-20 lg:px-16">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/60">Cómo funciona</p>
          <h2 className={`${playfair.className} mb-10 italic leading-[1.05] text-white`} style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)" }}>
            Alimentación y <br /> movimiento, semana <br /> a semana.
          </h2>

          <div className="flex flex-col">
            {pasos.map((paso, i) => (
              <div key={paso.titulo} className="border-t border-white/20 py-6 last:border-b">
                <p className="mb-2 text-lg font-semibold text-white">{String(i + 1).padStart(2, "0")}. {paso.titulo}</p>
                <p className="text-base leading-relaxed text-white/70">{paso.detalle}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============ TAMBIÉN TE PUEDE INTERESAR ============ */}
      <section className="bg-[#FBF3E7] px-6 py-24">
        <div className="mx-auto max-w-6xl">
          <h2 className={`${playfair.className} mb-12 italic leading-[1] text-[#1F1E1B]`} style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
            También te puede interesar
          </h2>

          <div className="flex flex-col gap-12 sm:flex-row">
            {otrosPlanes.map((plan) => (
              <Link key={plan.nombre} href={plan.href} className="group flex flex-1 flex-col gap-5">
                <div className="overflow-hidden rounded-2xl">
                  <img src={plan.foto} alt="" className="aspect-square w-full object-cover grayscale transition-all duration-500 ease-out group-hover:grayscale-0 group-hover:scale-105" />
                </div>
                <div>
                  <p className="text-lg font-semibold text-[#1F1E1B]">{plan.nombre}</p>
                  <p className="text-base text-[#5b5b52]">{plan.subtitulo}</p>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-12 flex items-center justify-between border-t border-black/10 pt-5 text-sm uppercase tracking-widest text-[#5b5b52]">
            <span>Ver todos los planes</span>
            <Link href="/" className="transition-colors duration-200 hover:text-[#1F1E1B]">→ </Link>
          </div>
        </div>
      </section>

      {/* ============ PREGUNTAS FRECUENTES ============ */}
      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className={`${playfair.className} mb-12 text-center italic leading-[1] text-[#1F1E1B]`} style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>
            Preguntas frecuentes
          </h2>

          <div className="border-t border-black/10">
            {faqs.map((faq) => (
              <FaqItem key={faq.pregunta} pregunta={faq.pregunta} respuesta={faq.respuesta} />
            ))}
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer className="bg-[#1F1E1B] px-6 py-24 text-white/60">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 sm:grid-cols-4">
          <div>
            <p className="mb-6 text-sm uppercase tracking-[0.3em] text-white">Novedades Ronsel</p>
            <div className="flex items-center rounded-full border border-white/25 px-5 py-3">
              <input type="email" placeholder="Tu email" className="w-full bg-transparent text-lg text-white placeholder-white/40 outline-none" />
              <button className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-white/10 text-lg text-white transition-colors hover:bg-white/20">→</button>
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