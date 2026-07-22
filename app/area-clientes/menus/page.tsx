"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Playfair_Display } from "next/font/google";
import { motion, AnimatePresence } from "framer-motion";
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

// ============ CLASIFICACIÓN DE INGREDIENTES (misma taxonomía que la lista de la compra del PDF) ============
const CATEGORIAS_ORDEN = [
  "Proteínas",
  "Lácteos",
  "Cereales y derivados",
  "Verduras y hortalizas",
  "Fruta",
  "Frutos secos",
  "Fondo de despensa",
  "Otros",
];

const PALABRAS_CLAVE: [string, string][] = [
  // Proteínas
  ["pollo", "Proteínas"],
  ["pavo", "Proteínas"],
  ["cerdo", "Proteínas"],
  ["salmón", "Proteínas"],
  ["merluza", "Proteínas"],
  ["bacalao", "Proteínas"],
  ["bonito", "Proteínas"],
  ["caballa", "Proteínas"],
  ["gambas", "Proteínas"],
  ["lubina", "Proteínas"],
  ["huevo", "Proteínas"],
  ["clara", "Proteínas"],
  ["jamón", "Proteínas"],
  ["atún", "Proteínas"],
  // Lácteos
  ["yogur", "Lácteos"],
  ["queso", "Lácteos"],
  ["mozzarella", "Lácteos"],
  ["burrata", "Lácteos"],
  // Cereales y derivados
  ["pan", "Cereales y derivados"],
  ["pasta", "Cereales y derivados"],
  ["arroz", "Cereales y derivados"],
  ["tortilla integral", "Cereales y derivados"],
  ["patata", "Cereales y derivados"],
  // Verduras y hortalizas
  ["lechuga", "Verduras y hortalizas"],
  ["canónigo", "Verduras y hortalizas"],
  ["espinaca", "Verduras y hortalizas"],
  ["calabacín", "Verduras y hortalizas"],
  ["pepino", "Verduras y hortalizas"],
  ["tomate", "Verduras y hortalizas"],
  ["pimiento", "Verduras y hortalizas"],
  ["cebolla", "Verduras y hortalizas"],
  ["champiñon", "Verduras y hortalizas"],
  ["champiñón", "Verduras y hortalizas"],
  ["espárrago", "Verduras y hortalizas"],
  ["zanahoria", "Verduras y hortalizas"],
  ["limón", "Verduras y hortalizas"],
  ["ajo", "Verduras y hortalizas"],
  ["rúcula", "Verduras y hortalizas"],
  ["berenjena", "Verduras y hortalizas"],
  ["albahaca", "Verduras y hortalizas"],
  // Fruta
  ["manzana", "Fruta"],
  ["melocotón", "Fruta"],
  ["fresa", "Fruta"],
  ["arándano", "Fruta"],
  ["cereza", "Fruta"],
  ["kiwi", "Fruta"],
  ["sandía", "Fruta"],
  ["plátano", "Fruta"],
  ["mandarina", "Fruta"],
  ["frambuesa", "Fruta"],
  ["frutos rojos", "Fruta"],
  // Frutos secos
  ["almendra", "Frutos secos"],
  ["nuez", "Frutos secos"],
  ["nueces", "Frutos secos"],
  // Fondo de despensa
  ["aceite", "Fondo de despensa"],
  ["vinagre", "Fondo de despensa"],
  ["pimienta", "Fondo de despensa"],
  ["orégano", "Fondo de despensa"],
  ["romero", "Fondo de despensa"],
  ["tomillo", "Fondo de despensa"],
  ["perejil", "Fondo de despensa"],
  ["canela", "Fondo de despensa"],
  ["pimentón", "Fondo de despensa"],
  ["eneldo", "Fondo de despensa"],
  ["menta", "Fondo de despensa"],
  ["chocolate", "Fondo de despensa"],
  ["cacao", "Fondo de despensa"],
];

// Quita cantidades y unidades del principio del ingrediente ("150 g de pechuga de pollo" -> "Pechuga de pollo")
function limpiarIngrediente(texto: string): string {
  let limpio = texto.trim();
  limpio = limpio.replace(
    /^(\d+([.,]\d+)?|¼|½|un|una|unos|unas)?\s*(g|kg|ml|l|cucharadas?|cucharaditas?|rebanadas?|unidades?|lonchas?|dientes?|hojas?|latas?|botellas?|gajos?|tazas?|filetes?)?\s*(de\s+)?/i,
    ""
  );
  limpio = limpio.trim();
  if (limpio.length === 0) return texto.trim();
  return limpio.charAt(0).toUpperCase() + limpio.slice(1);
}

function categorizarIngrediente(nombreLimpio: string): string {
  const enMinusculas = nombreLimpio.toLowerCase();
  for (const [palabra, categoria] of PALABRAS_CLAVE) {
    if (enMinusculas.includes(palabra)) {
      return categoria;
    }
  }
  return "Otros";
}

type Receta = {
  id: number;
  titulo: string;
  categoria: string;
  foto: string;
  ingredientes: string;
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
  const [listaComprasAbierta, setListaComprasAbierta] = useState(false);

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
      setListaComprasAbierta(false);

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
          .select("id, titulo, categoria, foto, ingredientes")
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

  // 3. Generamos la lista de la compra: toda la semana junta, limpia de duplicados y agrupada por tipo de alimento
  const idsRecetasDeLaSemana = Array.from(
    new Set(
      filas
        .filter((fila) => fila.receta_id !== null)
        .map((fila) => fila.receta_id as number)
    )
  );

  const ingredientesVistos = new Set<string>();
  const listaComprasPorCategoria: Record<string, string[]> = {};

  idsRecetasDeLaSemana.forEach((id) => {
    const receta = recetasMapa[id];
    if (!receta) return;

    receta.ingredientes
      .split(",")
      .map((ingrediente) => limpiarIngrediente(ingrediente))
      .filter(Boolean)
      .forEach((ingredienteLimpio) => {
        const clave = ingredienteLimpio.toLowerCase();
        if (ingredientesVistos.has(clave)) return;
        ingredientesVistos.add(clave);

        const categoria = categorizarIngrediente(ingredienteLimpio);
        if (!listaComprasPorCategoria[categoria]) {
          listaComprasPorCategoria[categoria] = [];
        }
        listaComprasPorCategoria[categoria].push(ingredienteLimpio);
      });
  });

  const gruposConContenido = CATEGORIAS_ORDEN.filter(
    (categoria) => (listaComprasPorCategoria[categoria] ?? []).length > 0
  );

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
          {/* Info general de la semana (presupuesto, consejo, reto — sigue siendo manual) */}
          {infoSemana &&
            (infoSemana.presupuesto ||
              infoSemana.consejo_general ||
              infoSemana.reto_hidratacion) && (
              <motion.div
                initial="hidden"
                animate="visible"
                variants={fadeUp}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="mb-12 grid grid-cols-1 gap-6 rounded-2xl bg-[#1E2A24] p-7 sm:grid-cols-2"
              >
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

          {/* Lista de la compra — generada automáticamente, agrupada por tipo de alimento */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUp}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mt-6 overflow-hidden rounded-2xl bg-[#1E2A24]"
          >
            <button
              onClick={() => setListaComprasAbierta((a) => !a)}
              className="flex w-full items-center justify-between gap-4 p-7 text-left"
            >
              <span className="flex items-center gap-3 text-lg font-semibold text-white">
                <span aria-hidden>🛒</span> Lista de la compra de la semana
              </span>
              <motion.span
                animate={{ rotate: listaComprasAbierta ? 45 : 0 }}
                transition={{ duration: 0.3 }}
                className="text-2xl text-[#D8C9A3]"
              >
                +
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {listaComprasAbierta && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: "easeInOut" }}
                  className="overflow-hidden"
                >
                  <div className="grid grid-cols-1 gap-6 px-7 pb-7 sm:grid-cols-2 lg:grid-cols-3">
                    {gruposConContenido.length > 0 ? (
                      gruposConContenido.map((categoria) => (
                        <div key={categoria}>
                          <p className="mb-2 text-xs uppercase tracking-widest text-[#D8C9A3]">
                            {categoria}
                          </p>
                          <ul className="space-y-1.5">
                            {listaComprasPorCategoria[categoria].map((ingrediente, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-2 text-sm text-[#F1ECE1]"
                              >
                                <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-[#B9C2BB]" />
                                {ingrediente}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))
                    ) : (
                      <p className="text-[#B9C2BB]">
                        Todavía no hay recetas asignadas esta semana para generar la
                        lista.
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </section>
  );
}