"use client";

import { Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const menus = [
  {
    titulo: "Semana del 14 al 20 de julio",
    subtitulo: "Menú equilibrado con opciones de verano",
    foto: "https://picsum.photos/seed/ronsel-menu-1/700/500",
  },
  {
    titulo: "Semana del 7 al 13 de julio",
    subtitulo: "Menú equilibrado, alto en fibra",
    foto: "https://picsum.photos/seed/ronsel-menu-2/700/500",
  },
  {
    titulo: "Semana del 30 de junio al 6 de julio",
    subtitulo: "Menú equilibrado, fácil de preparar",
    foto: "https://picsum.photos/seed/ronsel-menu-3/700/500",
  },
];

export default function Menus() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#dadada]">
          Tu contenido
        </p>
        <h1
          className={`${playfair.className} mb-14 italic leading-[1] text-[#dadada]`}
          style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
        >
          Menús
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {menus.map((item, i) => (
          <motion.div
            key={item.titulo}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 + i * 0.15 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group flex flex-col overflow-hidden rounded-2xl bg-[#1E2A24] shadow-md transition-shadow duration-300 hover:shadow-2xl"
          >
            <div className="overflow-hidden">
              <img
                src={item.foto}
                alt=""
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
            </div>
            <div className="p-7">
              <p className="mb-2 text-lg font-semibold text-white">{item.titulo}</p>
              <p className="text-base text-[#ffffff]">{item.subtitulo}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}