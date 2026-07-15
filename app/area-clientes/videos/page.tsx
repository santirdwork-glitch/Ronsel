"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import { motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";
import { tienePlanSuficiente } from "@/lib/planes";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const videos = [
  {
    titulo: "Pilates suave — movilidad de cadera",
    detalle: "18 min",
    foto: "https://picsum.photos/seed/ronsel-video-1/700/500",
  },
  {
    titulo: "Gimnasia funcional — tren superior",
    detalle: "25 min",
    foto: "https://picsum.photos/seed/ronsel-video-2/700/500",
  },
  {
    titulo: "Pilates — postura y respiración",
    detalle: "20 min",
    foto: "https://picsum.photos/seed/ronsel-video-3/700/500",
  },
];

export default function Videos() {
  const router = useRouter();
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const comprobarPlan = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;
      if (!userId) {
        router.push("/login");
        return;
      }

      const { data: perfil } = await supabase
        .from("perfiles")
        .select("plan")
        .eq("id", userId)
        .single();

      if (!perfil || !tienePlanSuficiente(perfil.plan, "Avanza")) {
        router.push("/area-clientes");
        return;
      }

      setCargando(false);
    };

    comprobarPlan();
  }, [router]);

  if (cargando) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm uppercase tracking-widest text-[#B9C2BB]">
          Cargando…
        </p>
      </div>
    );
  }

  return (
    <section className="mx-auto max-w-6xl px-6 py-20">
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeUp}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#262c27]">
          Tu contenido
        </p>
        <h1
          className={`${playfair.className} mb-14 italic leading-[1] text-[#27332b]`}
          style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
        >
          Vídeos
        </h1>
      </motion.div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((item, i) => (
          <motion.div
            key={item.titulo}
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 + i * 0.15 }}
            whileHover={{ y: -6, scale: 1.02 }}
            className="group flex flex-col overflow-hidden rounded-2xl bg-[#1E2A24] shadow-md transition-shadow duration-300 hover:shadow-2xl"
          >
            <div className="relative overflow-hidden">
              <img
                src={item.foto}
                alt=""
                className="aspect-[4/3] w-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors duration-300 group-hover:bg-black/30">
                <span className="flex h-14 w-14 scale-90 items-center justify-center rounded-full bg-white/90 text-2xl text-[#1E2A24] opacity-0 transition-all duration-300 group-hover:scale-100 group-hover:opacity-100">
                  ▶
                </span>
              </div>
            </div>
            <div className="p-7">
              <p className="mb-2 text-lg font-semibold text-white">{item.titulo}</p>
              <p className="text-base text-[#B9C2BB]">{item.detalle}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}