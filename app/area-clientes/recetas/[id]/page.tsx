"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

type Receta = {
  id: number;
  titulo: string;
  categoria: string;
  ingredientes: string;
  preparacion: string;
  kcal: number;
  proteina: number;
  foto: string;
};

const ETIQUETAS_CATEGORIA: Record<string, string> = {
  desayuno: "Desayuno",
  media_manana: "Media mañana",
  comida: "Comida",
  merienda: "Merienda / Antojo",
  cena: "Cena",
  postre: "Postre",
};

export default function RecetaDetalle() {
  const params = useParams();
  const [receta, setReceta] = useState<Receta | null>(null);
  const [cargando, setCargando] = useState(true);
  const [abierto, setAbierto] = useState<"ingredientes" | "preparacion" | null>(
    "ingredientes"
  );
  const [listaAbierta, setListaAbierta] = useState(false);
  const [marcados, setMarcados] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const cargarReceta = async () => {
      const { data, error } = await supabase
        .from("recetas")
        .select("*")
        .eq("id", params.id)
        .single();

      if (!error && data) {
        setReceta(data as Receta);
      }
      setCargando(false);
    };

    cargarReceta();
  }, [params.id]);

  if (cargando) {
    return (
      <div className="flex min-h-[50vh] items-center justify-center">
        <p className="text-sm uppercase tracking-widest text-[#B9C2BB]">
          Cargando…
        </p>
      </div>
    );
  }

  if (!receta) {
    return (
      <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4">
        <p className="text-lg text-[#B9C2BB]">No hemos encontrado esta receta.</p>
        <Link
          href="/area-clientes/recetas"
          className="text-sm uppercase tracking-widest text-[#D8C9A3] underline underline-offset-4"
        >
          Volver a recetas
        </Link>
      </div>
    );
  }

  const ingredientesLista = receta.ingredientes
    .split(",")
    .map((i) => i.trim())
    .filter(Boolean);

  const toggleMarcado = (i: number) => {
    setMarcados((prev) => ({ ...prev, [i]: !prev[i] }));
  };

  return (
    <section className="mx-auto max-w-6xl px-6 py-12 md:py-20">
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link
          href="/area-clientes/recetas"
          className="mb-8 inline-flex items-center gap-2 text-sm uppercase tracking-widest text-[#ffffff] transition-colors duration-200 hover:text-white"
        >
          <span aria-hidden>←</span> Volver a recetas
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-14">
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="overflow-hidden rounded-2xl md:sticky md:top-10 md:h-[75vh]"
        >
          <img
            src={receta.foto}
            alt={receta.titulo}
            className="h-64 w-full object-cover md:h-full"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } },
          }}
        >
          <motion.p
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            className="mb-3 text-sm uppercase tracking-[0.3em] text-[#fcbc1c]"
          >
            {ETIQUETAS_CATEGORIA[receta.categoria] ?? receta.categoria}
          </motion.p>

          <motion.h1
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            className={`${playfair.className} mb-6 italic leading-[1.05] text-white`}
            style={{ fontSize: "clamp(2rem, 4vw, 3.25rem)" }}
          >
            {receta.titulo}
          </motion.h1>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            className="mb-4 flex flex-wrap items-center gap-4"
          >
            <span className="rounded-full bg-[#1E2A24] px-5 py-2 text-sm text-[#F1ECE1] shadow-md">
              {receta.kcal} kcal
            </span>
            <span className="rounded-full bg-[#1E2A24] px-5 py-2 text-sm text-[#F1ECE1] shadow-md">
              {receta.proteina} g proteína
            </span>
            <button
              onClick={() => setListaAbierta((a) => !a)}
              className="flex items-center gap-2 rounded-full bg-[#D8C9A3] px-5 py-2 text-sm font-medium text-[#1E2A24] shadow-md transition-opacity hover:opacity-90"
            >
              <span aria-hidden>🛒</span> Lista de la compra
            </button>
          </motion.div>

          <AnimatePresence initial={false}>
            {listaAbierta && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="mb-6 overflow-hidden"
              >
                <div className="rounded-2xl bg-[#1E2A24] p-6">
                  <p className="mb-4 text-xs uppercase tracking-widest text-[#D8C9A3]">
                    Ingredientes de esta receta
                  </p>
                  <ul className="space-y-3">
                    {ingredientesLista.map((ingrediente, i) => (
                      <li key={i}>
                        <label className="flex cursor-pointer items-start gap-3">
                          <input
                            type="checkbox"
                            checked={!!marcados[i]}
                            onChange={() => toggleMarcado(i)}
                            className="mt-1 h-4 w-4 flex-shrink-0 accent-[#D8C9A3]"
                          />
                          <span
                            className={
                              marcados[i]
                                ? "text-[#7c8880] line-through"
                                : "text-[#F1ECE1]"
                            }
                          >
                            {ingrediente}
                          </span>
                        </label>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            className="mb-4 border-t border-white/10"
          >
            <button
              onClick={() =>
                setAbierto(abierto === "ingredientes" ? null : "ingredientes")
              }
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="text-lg font-semibold text-white">Ingredientes</span>
              <motion.span
                animate={{ rotate: abierto === "ingredientes" ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl text-[#806a32]"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {abierto === "ingredientes" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <ul className="mb-6 space-y-2">
                    {ingredientesLista.map((ingrediente, i) => (
                      <li key={i} className="flex items-start gap-3 text-[#d4d4d4]">
                        <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-[#B9C2BB]" />
                        {ingrediente}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          <motion.div
            variants={{ hidden: { opacity: 0, y: 15 }, visible: { opacity: 1, y: 0 } }}
            className="border-t border-white/10"
          >
            <button
              onClick={() =>
                setAbierto(abierto === "preparacion" ? null : "preparacion")
              }
              className="flex w-full items-center justify-between py-5 text-left"
            >
              <span className="text-lg font-semibold text-white">Preparación</span>
              <motion.span
                animate={{ rotate: abierto === "preparacion" ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl text-[#7c7c7c]"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {abierto === "preparacion" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <p className="mb-6 leading-relaxed text-[#d4d4d4]">
                    {receta.preparacion}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}