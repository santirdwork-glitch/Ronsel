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

const DIAS_ORDEN = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

const MOMENTOS_ORDEN = [
  { clave: "desayuno", etiqueta: "Desayuno" },
  { clave: "media_manana", etiqueta: "Media mañana" },
  { clave: "comida", etiqueta: "Comida" },
  { clave: "merienda", etiqueta: "Merienda" },
  { clave: "cena", etiqueta: "Cena" },
  { clave: "postre", etiqueta: "Postre" },
];

type Receta = {
  id: number;
  titulo: string;
  categoria: string;
  foto: string;
};

type FilaMenu = {
  id: number;
  semana: number;
  dia: string;
  momento: string;
  receta_id: number | null;
};

type SemanaInfo = {
  id: number;
  semana: number;
  lista_compra: string | null;
  presupuesto: string | null;
  consejo_general: string | null;
  reto_hidratacion: string | null;
};

export default function Menus() {
  const [semanasDisponibles, setSemanasDisponibles] = useState<number[]>([]);
  const [semanaSeleccionada, setSemanaSeleccionada] = useState<number | null>(null);
  const [filas, setFilas] = useState<FilaMenu[]>([]);
  const [recetasMapa, setRecetasMapa] = useState<Record<number, Receta>>({});
  const [infoSemana, setInfoSemana] = useState<SemanaInfo | null>(null);
  const [cargando, setCargando] = useState(true);

  // 1. Al cargar la página, averiguamos qué semanas existen
  useEffect(() => {
    async function cargarSemanasDisponibles() {
      const { data, error } = await supabase
        .from("menus_semanales")
        .select("semana")
        .order("semana", { ascending: true });

      if (!error && data) {
        const unicas = Array.from(new Set(data.map((fila) => fila.semana)));
        setSemanasDisponibles(unicas);
        if (unicas.length > 0) {
          setSemanaSeleccionada(unicas[0]);
        } else {
          setCargando(false);
        }
      } else {
        setCargando(false);
      }
    }
    cargarSemanasDisponibles();
  }, []);

  // 2. Cada vez que cambia la semana seleccionada, traemos su contenido
  useEffect(() => {
    if (semanaSeleccionada === null) return;

    async function cargarContenidoSemana() {
      setCargando(true);

      const { data: filasMenu } = await supabase
        .from("menus_semanales")
        .select("*")
        .eq("semana", semanaSeleccionada);

      const idsRecetas = Array.from(
        new Set(
          (filasMenu ?? [])
            .map((fila) => fila.receta_id)
            .filter((id): id is number => id !== null)
        )
      );

      let mapaRecetas: Record<number, Receta> = {};
      if (idsRecetas.length > 0) {
        const { data: recetasData } = await supabase
          .from("recetas")
          .select("id, titulo, categoria, foto")
          .in("id", idsRecetas);

        (recetasData ?? []).forEach((receta) => {
          mapaRecetas[receta.id] = receta;
        });
      }

      const { data: info } = await supabase
        .from("semanas_info")
        .select("*")
        .eq("semana", semanaSeleccionada)
        .maybeSingle();

      setFilas(filasMenu ?? []);
      setRecetasMapa(mapaRecetas);
      setInfoSemana(info ?? null);
      setCargando(false);
    }

    cargarContenidoSemana();
  }, [semanaSeleccionada]);

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
          className={`${playfair.className} mb-10 italic leading-[1] text-[#dadada]`}
          style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
        >
          Menús
        </h1>
      </motion.div>

      {/* Selector de semana */}
      {semanasDisponibles.length > 0 && (
        <div className="mb-12 flex flex-wrap gap-3">
          {semanasDisponibles.map((semana) => (
            <button
              key={semana}
              onClick={() => setSemanaSeleccionada(semana)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                semana === semanaSeleccionada
                  ? "bg-[#D8C9A3] text-[#1E2A24]"
                  : "bg-[#1E2A24] text-[#B9C2BB] hover:text-white"
              }`}
            >
              Semana {semana}
            </button>
          ))}
        </div>
      )}

      {cargando && <p className="text-[#B9C2BB]">Cargando…</p>}

      {!cargando && semanasDisponibles.length === 0 && (
        <p className="text-[#B9C2BB]">
          Todavía no hay ningún menú semanal publicado.
        </p>
      )}

      {!cargando && semanaSeleccionada !== null && (
        <>
          {/* Info general de la semana, si existe */}
          {infoSemana && (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeUp}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="mb-12 grid grid-cols-1 gap-6 rounded-2xl bg-[#1E2A24] p-7 sm:grid-cols-2"
            >
              {infoSemana.lista_compra && (
                <div>
                  <p className="mb-1 text-sm uppercase tracking-widest text-[#D8C9A3]">
                    Lista de la compra
                  </p>
                  <p className="whitespace-pre-line text-[#F1ECE1]">
                    {infoSemana.lista_compra}
                  </p>
                </div>
              )}
              {infoSemana.presupuesto && (
                <div>
                  <p className="mb-1 text-sm uppercase tracking-widest text-[#D8C9A3]">
                    Presupuesto
                  </p>
                  <p className="text-[#F1ECE1]">{infoSemana.presupuesto}</p>
                </div>
              )}
              {infoSemana.consejo_general && (
                <div>
                  <p className="mb-1 text-sm uppercase tracking-widest text-[#D8C9A3]">
                    Consejo de la semana
                  </p>
                  <p className="text-[#F1ECE1]">{infoSemana.consejo_general}</p>
                </div>
              )}
              {infoSemana.reto_hidratacion && (
                <div>
                  <p className="mb-1 text-sm uppercase tracking-widest text-[#D8C9A3]">
                    Reto de hidratación
                  </p>
                  <p className="text-[#F1ECE1]">{infoSemana.reto_hidratacion}</p>
                </div>
              )}
            </motion.div>
          )}

          {/* Calendario de la semana, día a día */}
          <div className="flex flex-col gap-6">
            {DIAS_ORDEN.map((dia, i) => {
              const filasDelDia = filas.filter((fila) => fila.dia === dia);
              if (filasDelDia.length === 0) return null;

              return (
                <motion.div
                  key={dia}
                  initial="hidden"
                  animate="visible"
                  variants={fadeUp}
                  transition={{ duration: 0.6, ease: "easeOut", delay: i * 0.05 }}
                  className="rounded-2xl bg-[#1E2A24] p-7"
                >
                  <p className="mb-4 text-lg font-semibold text-white">{dia}</p>
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {MOMENTOS_ORDEN.map(({ clave, etiqueta }) => {
                      const filaMomento = filasDelDia.find(
                        (fila) => fila.momento === clave
                      );
                      if (!filaMomento) return null;

                      const receta =
                        filaMomento.receta_id !== null
                          ? recetasMapa[filaMomento.receta_id]
                          : null;

                      const contenido = (
                        <>
                          <p className="text-xs uppercase tracking-widest text-[#B9C2BB]">
                            {etiqueta}
                          </p>
                          <div className="mt-1 flex items-center gap-3">
                            {receta && (
                              <img
                                src={receta.foto}
                                alt=""
                                className="h-10 w-10 flex-shrink-0 rounded-lg object-cover"
                              />
                            )}
                            <p className="text-[#F1ECE1]">
                              {receta ? receta.titulo : "Sin receta asignada"}
                            </p>
                          </div>
                        </>
                      );

                      // Si hay receta, todo el bloque es clicable y lleva a su página de detalle
                      if (receta) {
                        return (
                          <Link
                            key={clave}
                            href={`/area-clientes/recetas/${receta.id}`}
                            className="block border-l-2 border-[#D8C9A3] pl-3 transition-opacity hover:opacity-80"
                          >
                            {contenido}
                          </Link>
                        );
                      }

                      // Sin receta asignada, no tiene sentido que sea clicable
                      return (
                        <div key={clave} className="border-l-2 border-[#D8C9A3] pl-3">
                          {contenido}
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </>
      )}
    </section>
  );
}