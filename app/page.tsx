"use client";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });

const MotionLink = motion(Link);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const planes = [
    { nombre: "Empieza", precio: "9,99", subtitulo: "Aprende a comer mejor, a tu ritmo", color: "#E8836C", foto: "/images/video-empieza.mp4", href: "/empieza" },
    { nombre: "Avanza", precio: "19,99", subtitulo: "Alimentación + Pilates en casa", color: "#2F6E68", foto: "/images/video-avanza.mp4", href: "/avanza" },
    { nombre: "Transforma", precio: "29,99", subtitulo: "Acompañamiento completo, cada día", color: "#E2A63C", foto: "/images/video-transforma.mp4", href: "/transforma" },
  ];

  const valores = [
    { n: "01", texto: "Adaptado a tu día a día" },
    { n: "02", texto: "Menús y clases nuevas cada semana" },
    { n: "03", texto: "Todo desde casa, sin horarios fijos" },
    { n: "04", texto: "Acompañamiento cercano y real" },
  ];

  const enfoque = ["Nutrición", "Movimiento", "Hábitos", "Motivación", "Organización", "Acompañamiento"];

  return (
    <div className="min-h-screen bg-[#FBF3E7] text-[#1F1E1B]">
      {/* NAVEGACIÓN */}
      <nav>
        <div className="grid grid-cols-3 items-center px-4 sm:px-6 pt-8 pb-6">
          <div />
          <Link href="/" className={`${greatVibes.className} justify-self-center text-4xl md:text-5xl lg:text-6xl text-[#2F6E68]`}>
            Ronsel
          </Link>
          <Link
            href="/login"
            className="justify-self-end whitespace-nowrap text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#5b5b52] hover:text-[#1F1E1B] transition-colors"
          >
            Área clientes
          </Link>
        </div>
        <div className="flex items-center justify-center gap-4 sm:gap-6 md:gap-14 border-t border-b border-black/10 px-4 py-4 text-xs md:text-sm uppercase tracking-[0.2em] md:tracking-[0.3em] text-[#1F1E1B] overflow-x-auto">
          <Link href="/empieza" className="hover:opacity-60 transition-opacity whitespace-nowrap">Empieza</Link>
          <Link href="/avanza" className="hover:opacity-60 transition-opacity whitespace-nowrap">Avanza</Link>
          <Link href="/transforma" className="hover:opacity-60 transition-opacity whitespace-nowrap">Transforma</Link>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative h-[80vh] min-h-[500px] md:min-h-[650px] w-full overflow-hidden">
        <img
          src="/images/foto-home.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

        <div className={`relative z-10 flex h-full flex-col justify-end px-6 md:px-12 lg:px-16 pb-12 md:pb-16 transition-all duration-700 ${mounted ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}>
          <p className="mb-3 text-[10px] md:text-sm uppercase tracking-[0.2em] md:tracking-[0.35em] text-white/80">
            Nutrición — Pilates — Bienestar
          </p>
          <h1 className={`${playfair.className} mb-6 italic leading-[1.05] text-white`}
              style={{ fontSize: "clamp(2.2rem, 9vw, 5rem)" }}>
            Pequeñas decisiones,<br className="md:hidden" /> grandes cambios
          </h1>
          <p className="mb-8 max-w-md text-base md:text-lg leading-relaxed text-white/85">
            Menús, recetas y clases de Pilates pensadas para adaptarse a tu vida real.
          </p>
          <MotionLink
            href="#planes"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="w-fit border border-white px-8 py-3 text-sm uppercase tracking-[0.2em] text-white hover:bg-white hover:text-[#1F1E1B] transition-colors"
          >
            Elige tu plan
          </MotionLink>
        </div>
      </section>

      {/* FRANJA DE VALORES */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-[#2F6E68] px-6 py-12 md:py-16"
      >
        <div className="mx-auto grid max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {valores.map((item) => (
            <div key={item.texto} className="flex flex-col gap-3">
              <span className={`${playfair.className} text-2xl md:text-3xl italic text-white/50`}>{item.n}</span>
              <p className="text-base md:text-lg leading-snug text-white">{item.texto}</p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* NO ES UNA DIETA */}
      <section className="grid grid-cols-1 lg:grid-cols-2">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="h-64 sm:h-80 lg:h-auto"
        >
          <img
            src="/images/foto-home2.jpg"
            alt=""
            className="h-full w-full object-cover"
          />
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="flex flex-col justify-center px-6 py-12 md:py-16 lg:px-24"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#5b5b52]">Esto no es una dieta más</p>
          <h2 className={`${playfair.className} mb-8 italic leading-[1] text-[#1F1E1B]`}
              style={{ fontSize: "clamp(2rem, 8vw, 4.5rem)" }}>
            Es tu punto de partida.
          </h2>
          <p className="mb-6 text-base md:text-lg leading-relaxed text-[#5b5b52]">
            En Ronsel te ayudamos a construir hábitos que sí se sostienen, combinando alimentación real y movimiento a tu ritmo.
          </p>
          <MotionLink
            href="#planes"
            whileHover={{ x: 4 }}
            className="group flex w-fit items-center gap-4 text-sm uppercase tracking-[0.2em] text-[#2F6E68]"
          >
            Descubre los planes
            <span className="h-px w-8 bg-[#2F6E68] group-hover:w-12 transition-all" />
          </MotionLink>
        </motion.div>
      </section>

      {/* ENFOQUE INTEGRAL */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-[#1F1E1B] px-6 py-16 md:py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">Nuestro enfoque</p>
          <h2 className={`${playfair.className} mb-10 md:mb-16 lg:mb-20 italic leading-[1] text-white`}
              style={{ fontSize: "clamp(2.2rem, 8vw, 5.5rem)" }}>
            Bienestar, sin fragmentos.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/15">
            {enfoque.map((item, i) => (
              <div key={item} className="border-b border-white/15 px-0 py-6 sm:px-8">
                <span className="mr-4 text-xs text-white/40">{String(i + 1).padStart(2, "0")}</span>
                <span className="text-lg text-white">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PLANES */}
      <section id="planes" className="bg-white px-6 py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`${playfair.className} mb-12 md:mb-16 text-center italic leading-[1] text-[#1F1E1B]`}
            style={{ fontSize: "clamp(2.2rem, 8vw, 5rem)" }}
          >
            Elige tu camino
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {planes.map((plan, i) => (
              <MotionLink
                href={plan.href}
                key={plan.nombre}
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.15 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onMouseEnter={() => videoRefs.current[i]?.play()}
                onMouseLeave={() => {
                  const v = videoRefs.current[i];
                  if (v) {
                    v.pause();
                    v.currentTime = 0;
                  }
                }}
                className="group flex flex-col border border-black/5 hover:shadow-xl transition-shadow"
              >
                <div className="overflow-hidden">
                  {plan.foto.endsWith(".mp4") ? (
                    <video
                      ref={(el) => { videoRefs.current[i] = el; }}
                      src={plan.foto}
                      loop
                      muted
                      playsInline
                      className="aspect-[4/5] w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  ) : (
                    <img
                      src={plan.foto}
                      alt=""
                      className="aspect-[4/5] w-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    />
                  )}
                </div>
                <div className="p-6 md:p-8">
                  <p className={`${playfair.className} mb-2 text-2xl md:text-3xl italic`} style={{ color: plan.color }}>
                    {plan.nombre}
                  </p>
                  <p className="text-sm text-[#5b5b52] mb-6">{plan.subtitulo}</p>
                  <p className="font-medium text-xl md:text-2xl">
                    {plan.precio}€ <span className="text-xs md:text-sm text-[#5b5b52]">/mes</span>
                  </p>
                </div>
              </MotionLink>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-[#1F1E1B] px-6 py-12 md:py-16 text-white/60">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white">Novedades</p>
            <div className="flex border-b border-white/25 pb-2">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full bg-transparent text-sm text-white placeholder-white/30 outline-none"
              />
              <button>→</button>
            </div>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white">Planes</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/empieza">Empieza</Link></li>
              <li><Link href="/avanza">Avanza</Link></li>
              <li><Link href="/transforma">Transforma</Link></li>
            </ul>
          </div>
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white">Cuenta</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/login">Iniciar sesión</Link></li>
              <li><Link href="/formulario">Crear cuenta</Link></li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}