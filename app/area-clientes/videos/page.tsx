"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
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

type Video = {
  id: number;
  titulo: string;
  descripcion: string | null;
  youtube_id: string;
  semana: number;
  foto_portada: string | null;
};

export default function Videos() {
  const router = useRouter();
  const [cargando, setCargando] = useState(true);
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoAbierto, setVideoAbierto] = useState<Video | null>(null);

  // 1. Comprobación de plan (sin cambios respecto a la versión anterior)
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

      cargarVideos();
    };

    comprobarPlan();
  }, [router]);

  // 2. Traemos los vídeos de Supabase, solo si el plan es suficiente
  const cargarVideos = async () => {
    const { data } = await supabase
      .from("videos")
      .select("*")
      .order("semana", { ascending: true });

    setVideos(data ?? []);
    setCargando(false);
  };

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
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#dfdfdf]">
          Tu contenido
        </p>
        <h1
          className={`${playfair.className} mb-14 italic leading-[1] text-[#ffffff]`}
          style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
        >
          Vídeos
        </h1>
      </motion.div>

      {videos.length === 0 && (
        <p className="text-[#B9C2BB]">Todavía no hay ningún vídeo publicado.</p>
      )}

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {videos.map((item, i) => {
          // Si no hay foto_portada guardada a mano, usamos la miniatura automática de YouTube
          const portada =
            item.foto_portada ||
            `https://img.youtube.com/vi/${item.youtube_id}/hqdefault.jpg`;

          return (
            <motion.div
              key={item.id}
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 + i * 0.15 }}
              whileHover={{ y: -6, scale: 1.02 }}
              onClick={() => setVideoAbierto(item)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl bg-[#1E2A24] shadow-md transition-shadow duration-300 hover:shadow-2xl"
            >
              <div className="relative overflow-hidden">
                <img
                  src={portada}
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
                <p className="text-base text-[#B9C2BB]">
                  {item.descripcion || `Semana ${item.semana}`}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Modal con el reproductor de YouTube incrustado */}
      <AnimatePresence>
        {videoAbierto && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setVideoAbierto(null)}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-6"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-3xl"
            >
              <div className="mb-3 flex items-center justify-between">
                <p className="text-lg font-semibold text-white">
                  {videoAbierto.titulo}
                </p>
                <button
                  onClick={() => setVideoAbierto(null)}
                  className="text-2xl text-white/80 transition-colors hover:text-white"
                  aria-label="Cerrar"
                >
                  ✕
                </button>
              </div>
              <div className="aspect-video w-full overflow-hidden rounded-2xl">
                <iframe
                  src={`https://www.youtube.com/embed/${videoAbierto.youtube_id}?autoplay=1`}
                  title={videoAbierto.titulo}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="h-full w-full"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}