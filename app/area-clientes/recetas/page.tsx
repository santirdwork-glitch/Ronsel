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

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

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

const CATEGORIAS_ORDEN = [
  { clave: "desayuno", etiqueta: "Desayunos" },
  { clave: "media_manana", etiqueta: "Media mañana" },
  { clave: "comida", etiqueta: "Comidas" },
  { clave: "merienda", etiqueta: "Meriendas / Antojos" },
  { clave: "cena", etiqueta: "Cenas" },
  { clave: "postre", etiqueta: "Postres" },
];

export default function Recetas() {
  const [recetas, setRecetas] = useState<Receta[]>([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarRecetas = async () => {
      const { data, error } = await supabase
        .from("recetas")
        .select("*")
        .order("id", { ascending: true });

      if (!error && data) {
        setRecetas(data as Receta[]);
      }

      setCargando(false);
    };

    cargarRecetas();
  }, []);

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
        <p className="mb-3 text-sm uppercase tracking-[0.3em] text-[#dadada]">
          Tu contenido
        </p>
        <h1
          className={`${playfair.className} mb-14 italic leading-[1] text-[#dadada]`}
          style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
        >
          Recetas
        </h1>
      </motion.div>

      {CATEGORIAS_ORDEN.map(({ clave, etiqueta }) => {
        const recetasDeCategoria = recetas.filter((r) => r.categoria === clave);

        if (recetasDeCategoria.length === 0) return null;

        return (
          <div key={clave} className="mb-16">
            <h2
              className={`${playfair.className} mb-6 text-2xl italic text-[#fafafa]`}
            >
              {etiqueta}
            </h2>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {recetasDeCategoria.map((item, i) => (
                <Link key={item.id} href={`/area-clientes/recetas/${item.id}`}>
  <motion.div
    initial="hidden"
    animate="visible"
    variants={fadeUp}
    transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 + i * 0.1 }}
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
      <p className="mb-2 text-lg font-semibold text-white">
        {item.titulo}
      </p>
      <p className="text-base text-[#B9C2BB]">
        {item.kcal} kcal · {item.proteina} g proteína
      </p>
    </div>
  </motion.div>
</Link>
              ))}
            </div>
          </div>
        );
      })}
    </section>
  );
}