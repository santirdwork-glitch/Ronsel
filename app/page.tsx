"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"] });

const MotionLink = motion.create(Link);

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0 },
};

const beneficios = [
  { titulo: "Más energía", texto: "Aprende a alimentarte de forma equilibrada para sentirte con más vitalidad." },
  { titulo: "Más organización", texto: "Olvídate de pensar cada día qué cocinar. Nosotros te ayudamos a planificarlo." },
  { titulo: "Más movimiento", texto: "Disfruta de clases de Pilates y Gimnasia Funcional adaptadas para hacer desde casa." },
  { titulo: "Menos estrés", texto: "Sin contar calorías constantemente. Sin prohibiciones. Sin culpa." },
  { titulo: "Hábitos que duran", texto: "Porque el verdadero cambio no ocurre en una semana, sino en los pequeños pasos que repites cada día." },
];

const preguntas = [
  {
    pregunta: "¿Voy a pasar hambre?",
    respuesta: "No. Nuestro objetivo no es que comas menos, sino que aprendas a alimentarte de forma equilibrada para sentirte con más energía y llegar a las comidas sin ansiedad.",
  },
  {
    pregunta: "Nunca he hecho Pilates. ¿Podré seguir las clases?",
    respuesta: "Claro. Las clases están adaptadas para todos los niveles y podrás hacerlas desde casa, a tu ritmo y cuando mejor te venga.",
  },
  {
    pregunta: "No tengo tiempo para cocinar. ¿Esto es para mí?",
    respuesta: "Sí. Las recetas están pensadas para personas con poco tiempo, con ingredientes fáciles de encontrar y preparaciones rápidas para el día a día.",
  },
  {
    pregunta: "¿Puedo cancelar mi suscripción cuando quiera?",
    respuesta: "Sí. No existe permanencia. Puedes cancelar tu suscripción en cualquier momento.",
  },
];

// ============ MENÚ DE CUENTA (nuevo) ============
function CuentaMenu() {
  const router = useRouter();
  const [cargando, setCargando] = useState(true);
  const [sesion, setSesion] = useState<{ nombre: string | null } | null>(null);
  const [abierto, setAbierto] = useState(false);

  useEffect(() => {
    const cargarSesion = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;

      if (!userId) {
        setSesion(null);
        setCargando(false);
        return;
      }

      const { data: perfil } = await supabase
        .from("perfiles")
        .select("nombre")
        .eq("id", userId)
        .single();

      setSesion({ nombre: perfil?.nombre ?? null });
      setCargando(false);
    };

    cargarSesion();

    // Se actualiza solo si la sesión cambia (login/logout en cualquier pestaña)
    const { data: listener } = supabase.auth.onAuthStateChange(() => {
      cargarSesion();
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setAbierto(false);
    router.push("/");
  };

  if (cargando) {
    // Espacio reservado del mismo tamaño aprox., evita que el nav "salte" al cargar
    return <div className="h-4 w-24 justify-self-end" />;
  }

  return (
    <div className="relative justify-self-end">
      <button
        onClick={() => setAbierto((a) => !a)}
        className="flex items-center gap-1.5 whitespace-nowrap text-[10px] sm:text-xs uppercase tracking-[0.15em] sm:tracking-[0.2em] text-[#5b5b52] hover:text-[#1F1E1B] transition-colors"
      >
        {sesion ? (sesion.nombre ? `Hola, ${sesion.nombre}` : "Mi cuenta") : "Área clientes"}
        <motion.span animate={{ rotate: abierto ? 180 : 0 }} className="text-[8px]">
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {abierto && (
          <>
            {/* Capa invisible para cerrar el menú al hacer clic fuera */}
            <div className="fixed inset-0 z-40" onClick={() => setAbierto(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute right-0 top-full z-50 mt-3 w-48 overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg"
            >
              {sesion ? (
                <>
                  <Link
                    href="/area-clientes"
                    onClick={() => setAbierto(false)}
                    className="block px-5 py-3 text-xs uppercase tracking-widest text-[#1F1E1B] hover:bg-[#FBF3E7] transition-colors"
                  >
                    Ir a mi área
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full px-5 py-3 text-left text-xs uppercase tracking-widest text-[#5b5b52] hover:bg-[#FBF3E7] transition-colors"
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={() => setAbierto(false)}
                    className="block px-5 py-3 text-xs uppercase tracking-widest text-[#1F1E1B] hover:bg-[#FBF3E7] transition-colors"
                  >
                    Iniciar sesión
                  </Link>
                  <Link
                    href="/formulario"
                    onClick={() => setAbierto(false)}
                    className="block border-t border-black/5 px-5 py-3 text-xs uppercase tracking-widest text-[#2F6E68] hover:bg-[#FBF3E7] transition-colors"
                  >
                    Crear cuenta
                  </Link>
                </>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [faqAbierta, setFaqAbierta] = useState<number | null>(null);

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

  return (
    <div className="min-h-screen bg-[#FBF3E7] text-[#1F1E1B]">
      {/* NAVEGACIÓN */}
      <nav>
        <div className="grid grid-cols-3 items-center px-4 sm:px-6 pt-8 pb-6">
          <div />
          <Link href="/" className={`${greatVibes.className} justify-self-center text-4xl md:text-5xl lg:text-6xl text-[#2F6E68]`}>
            Ronsel
          </Link>
          <CuentaMenu />
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
            className="w-fit rounded-full border border-white px-8 py-3 text-sm uppercase tracking-[0.2em] text-white hover:bg-white hover:text-[#1F1E1B] transition-colors"
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
          <h2 className={`${playfair.className} mb-8 italic leading-[1.05] text-[#1F1E1B]`}
              style={{ fontSize: "clamp(1.7rem, 6vw, 3.2rem)" }}>
            Mi objetivo no es que hagas una dieta durante un mes. Mi objetivo es darte las herramientas para que aprendas a cuidarte durante toda la vida.
          </h2>
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

      {/* SOBRE MÍ — teaser */}
      <section className="grid grid-cols-1 lg:grid-cols-2 bg-[#FBF3E7]">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="order-2 lg:order-1 flex flex-col justify-center px-6 py-12 md:py-16 lg:px-24"
        >
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#5b5b52]">Quién hay detrás</p>
          <h2 className={`${playfair.className} mb-6 italic leading-[1] text-[#1F1E1B]`}
              style={{ fontSize: "clamp(2rem, 7vw, 3.8rem)" }}>
            Hola, soy Noemi.
          </h2>
          <p className="mb-6 text-base md:text-lg leading-relaxed text-[#5b5b52]">
            Empecé con el Pilates como complemento a mis entrenamientos de patinaje agresivo, y con el tiempo entendí que el movimiento era solo una parte del camino. Así nació Ronsel: un proyecto donde uno la alimentación y el movimiento para ayudarte a crear hábitos que se sostienen, sin dietas imposibles.
          </p>
          <MotionLink
            href="/sobre-mi"
            whileHover={{ x: 4 }}
            className="group flex w-fit items-center gap-4 text-sm uppercase tracking-[0.2em] text-[#2F6E68]"
          >
            Conoce mi historia
            <span className="h-px w-8 bg-[#2F6E68] group-hover:w-12 transition-all" />
          </MotionLink>
        </motion.div>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
          className="order-1 lg:order-2 h-64 sm:h-80 lg:h-auto"
        >
          <img
            src="/images/sobre-mi.jpg"
            alt="Noemi, fundadora de Ronsel"
            className="h-full w-full object-cover"
          />
        </motion.div>
      </section>

      {/* BENEFICIOS */}
      <motion.section
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-[#1F1E1B] px-6 py-16 md:py-24 lg:py-32"
      >
        <div className="mx-auto max-w-7xl">
          <p className="mb-6 text-xs uppercase tracking-[0.2em] text-white/40">Qué puedes conseguir</p>
          <h2 className={`${playfair.className} mb-10 md:mb-16 lg:mb-20 italic leading-[1] text-white`}
              style={{ fontSize: "clamp(2.2rem, 8vw, 5.5rem)" }}>
            No buscamos cambios rápidos.
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border-t border-white/15">
            {beneficios.map((item, i) => (
              <div key={item.titulo} className="border-b border-white/15 px-0 py-8 sm:px-8">
                <span className="mb-3 block text-xs text-white/40">{String(i + 1).padStart(2, "0")}</span>
                <p className="mb-2 text-lg font-medium text-white">{item.titulo}</p>
                <p className="text-sm leading-relaxed text-white/60">{item.texto}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* PLANES */}
      <section id="planes" className="bg-[#ffffff] px-6 py-16 md:py-24 lg:py-32">
        <div className="mx-auto max-w-7xl">
          <motion.h2
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className={`${playfair.className} mb-12 md:mb-16 text-center italic leading-[1] text-white`}
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
                className="group flex flex-col overflow-hidden rounded-2xl border border-black/5 hover:shadow-xl transition-shadow"
              >
                <div className="overflow-hidden">
                  {plan.foto.endsWith(".mp4") ? (
                    <video
                      ref={(el) => { videoRefs.current[i] = el; }}
                      src={plan.foto}
                      loop
                      muted
                      playsInline
                      className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <img
                      src={plan.foto}
                      alt=""
                      className="aspect-[4/5] w-full object-cover transition-transform duration-500 group-hover:scale-105"
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

      {/* PREGUNTAS FRECUENTES */}
      <motion.section
        id="faq"
        variants={fadeUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="bg-[#FBF3E7] px-6 py-16 md:py-24"
      >
        <div className="mx-auto max-w-3xl">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-[#5b5b52]">¿Tienes dudas?</p>
          <h2 className={`${playfair.className} mb-10 md:mb-14 italic leading-[1] text-[#1F1E1B]`}
              style={{ fontSize: "clamp(2rem, 6vw, 3.2rem)" }}>
            Te las resolvemos.
          </h2>
          <div className="flex flex-col divide-y divide-black/10 border-t border-b border-black/10">
            {preguntas.map((item, i) => {
              const abierta = faqAbierta === i;
              return (
                <div key={item.pregunta}>
                  <button
                    onClick={() => setFaqAbierta(abierta ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-6 text-left"
                  >
                    <span className="text-base md:text-lg font-medium text-[#1F1E1B]">{item.pregunta}</span>
                    <motion.span
                      animate={{ rotate: abierta ? 45 : 0 }}
                      className="shrink-0 text-2xl text-[#2F6E68]"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {abierta && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeOut" }}
                        className="overflow-hidden"
                      >
                        <p className="pb-6 text-sm md:text-base leading-relaxed text-[#5b5b52]">
                          {item.respuesta}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </motion.section>

      {/* FOOTER */}
      <footer className="bg-[#1F1E1B] px-6 py-12 md:py-16 text-white/60">
        <div className="mx-auto max-w-7xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 md:gap-12">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white">Novedades</p>
            <div className="flex items-center rounded-full border border-white/25 px-4 py-2">
              <input
                type="email"
                placeholder="Tu email"
                className="w-full bg-transparent text-sm text-white placeholder-white/30 outline-none"
              />
              <button className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white/10 text-sm transition-colors hover:bg-white/20">
                →
              </button>
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
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white">Ayuda</p>
            <ul className="flex flex-col gap-2 text-sm">
              <li><Link href="/sobre-mi">Sobre mí</Link></li>
              <li><Link href="#faq">Preguntas frecuentes</Link></li>
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