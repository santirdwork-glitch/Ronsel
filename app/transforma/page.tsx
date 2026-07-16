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

const COLOR = "#E2A63C";

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

export default function Transforma() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  const incluye = [
    { titulo: "Vídeos diarios de Pilates y Gimnasia Funcional", detalle: "Un vídeo nuevo cada día, para entrenar en casa al ritmo que necesites." },
    { titulo: "Rutinas variadas para mantener la motivación", detalle: "Combinamos estilos y niveles de intensidad para que no caigas en la rutina." },
    { titulo: "Programación semanal de entrenamiento", detalle: "Un calendario claro de qué hacer cada día, para que no tengas que pensarlo tú." },
  ];

  const pasos = [
    { titulo: "Te registras", detalle: "Rellenas el formulario con tus datos y eliges el plan Transforma." },
    { titulo: "Activamos tu acceso", detalle: "Te enviamos las instrucciones para completar el pago por Bizum. Activamos tu acceso en menos de 24h." },
    { titulo: "Empiezas tu acompañamiento", detalle: "Cada semana recibes tu menú, recetas, programación y vídeos diarios en tu zona de clientes." },
  ];

  const faqs = [
    { pregunta: "¿Transforma incluye todo lo de Empieza y Avanza?", respuesta: "Sí. Incluye menús, recetas y guías de Empieza, los vídeos de Pilates de Avanza, y además vídeos diarios y programación específica." },
    { pregunta: "¿Cuánto tiempo hay que dedicarle cada día?", respuesta: "Las rutinas se adaptan a tu disponibilidad; tú decides cuánto entrenar según tu programación semanal." },
    { pregunta: "¿Puedo cancelar cuando quiera?", respuesta: "Sí, no hay permanencia. Puedes darte de baja el mes que quieras." },
    { pregunta: "¿En cuánto tiempo tengo acceso tras pagar?", respuesta: "En menos de 24 horas desde que confirmamos el Bizum, tendrás acceso a tu zona de clientes." },
  ];

  return (
    <div className="min-h-screen bg-[#FBF3E7]">
      <nav className="flex items-center justify-between border-b border-black/10 px-6 py-4">
        <Link href="/" className={`${greatVibes.className} text-3xl text-[#2F6E68]`}>Ronsel</Link>
        <div className="hidden gap-10 text-sm uppercase tracking-widest text-[#5b5b52] sm:flex">
          <Link href="/empieza" className="transition-colors hover:text-[#1F1E1B]">Empieza</Link>
          <Link href="/avanza" className="transition-colors hover:text-[#1F1E1B]">Avanza</Link>
          <Link href="/transforma" className="text-[#1F1E1B]">Transforma</Link>
        </div>
        <Link href="/formulario" className="text-sm uppercase tracking-widest text-[#5b5b52] transition-colors hover:text-[#1F1E1B]">Contacto</Link>
      </nav>

      <section className="mx-auto grid max-w-6xl grid-cols-1 gap-14 px-6 py-20 lg:grid-cols-2 lg:gap-20">
        <div className="overflow-hidden rounded-2xl">
          <video
            src="/images/transforma/video-pag-transforma.mp4"
            autoPlay
            loop
            muted
            playsInline
            className="aspect-[4/5] w-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
        <div className={`flex flex-col justify-center transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#5b5b52]">Planes · Transforma</p>
          <h1 className={`${playfair.className} mb-6 italic leading-[1] text-[#1F1E1B]`} style={{ fontSize: "clamp(2.75rem, 5.5vw, 5.5rem)" }}>Transforma</h1>
          <p className="mb-8 text-lg leading-relaxed text-[#5b5b52]">
            Diseñada para quienes buscan un acompañamiento completo, combinando alimentación saludable y ejercicio diario para crear hábitos duraderos.
          </p>
          <div className="border-t border-black/10">
            {incluye.map((item) => <AccordionItem key={item.titulo} title={item.titulo} detail={item.detalle} />)}
          </div>
          
          <Link href="/formulario?plan=Transforma" className="mt-10 flex items-center justify-center rounded-full py-5 text-sm font-medium uppercase tracking-widest text-white transition-all hover:opacity-90" style={{ backgroundColor: COLOR }}>
            Quiero apuntarme — 29,99€/mes
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

      <section className="grid grid-cols-1 bg-[#1F1E1B] lg:grid-cols-2">
        <div className="overflow-hidden">
          <img src="https://picsum.photos/seed/ronsel-transforma-detalle/900/1100" alt="" className="h-full w-full object-cover opacity-80" />
        </div>
        <div className="flex flex-col justify-center px-6 py-20 lg:px-16">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-white/60">Cómo funciona</p>
          <h2 className={`${playfair.className} mb-10 italic leading-[1.05] text-white`} style={{ fontSize: "clamp(2.25rem, 4.5vw, 3.75rem)" }}>Un acompañamiento<br />completo, semana<br />a semana.</h2>
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

      <section className="bg-white px-6 py-24">
        <div className="mx-auto max-w-3xl">
          <h2 className={`${playfair.className} mb-12 text-center italic leading-[1] text-[#1F1E1B]`} style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}>Preguntas frecuentes</h2>
          <div className="border-t border-black/10">
            {faqs.map((faq) => <FaqItem key={faq.pregunta} pregunta={faq.pregunta} respuesta={faq.respuesta} />)}
          </div>
        </div>
      </section>
    </div>
  );
}