"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const MotionLink = motion(Link);

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

export default function AreaClientesHome() {
  const [nombre, setNombre] = useState("");
  const [plan, setPlan] = useState("");

  useEffect(() => {
    const cargarPerfil = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;
      if (!userId) return;

      const { data: perfil } = await supabase
        .from("perfiles")
        .select("nombre, plan")
        .eq("id", userId)
        .single();

      if (perfil) {
        setNombre(perfil.nombre);
        setPlan(perfil.plan);
      }
    };

    cargarPerfil();
  }, []);

  const accesos = [
    {
      titulo: "Menús",
      subtitulo: "Tus menús semanales equilibrados",
      foto: "https://picsum.photos/seed/ronsel-cliente-menus/700/500",
      href: "/area-clientes/menus",
      color: "#E8836C",
    },
    {
      titulo: "Recetas",
      subtitulo: "Fáciles, rápidas y de tu semana",
      foto: "https://picsum.photos/seed/ronsel-cliente-recetas/700/500",
      href: "/area-clientes/recetas",
      color: "#2F6E68",
    },
    {
      titulo: "Vídeos",
      subtitulo: "Tus clases de Pilates y ejercicio",
      foto: "https://picsum.photos/seed/ronsel-cliente-videos/700/500",
      href: "/area-clientes/videos",
      color: "#E2A63C",
    },
  ];

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#5b5b52]">
          Tu zona de clientes
        </p>
        <h1
          className={`${playfair.className} mb-4 italic leading-[1] text-[#1F1E1B]`}
          style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
        >
          Hola, {nombre}
        </h1>
        <p className="mb-14 text-lg text-[#5b5b52]">
          Tu plan actual es <span className="font-semibold text-[#2F6E68]">{plan}</span>.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
        {accesos.map((item, i) => (
          <MotionLink
            key={item.titulo}
            href={item.href}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.15 + i * 0.15 }}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
              <p
                className={`${playfair.className} mb-2 text-2xl italic text-white`}
              >
                {item.titulo}
              </p>
              <div
                className="mb-3 h-[2px] w-10"
                style={{ backgroundColor: item.color }}
              />
              <p className="text-base text-white">{item.subtitulo}</p>
            </div>
          </MotionLink>
        ))}
      </div>
    </section>
  );
}