// scripts/rellenar-fotos-pexels.mjs
//
// Rellena la columna "foto" de las recetas de Supabase buscando una imagen
// automáticamente en Pexels.
//
// Uso normal (recomendado, cada vez que añadas recetas nuevas):
//   node scripts/rellenar-fotos-pexels.mjs
//   -> Solo busca foto para las recetas que tienen "foto" vacío o nulo.
//      No toca las que ya tienen foto (ni las que corregiste a mano).
//
// Para regenerar TODAS las fotos desde cero (sobrescribe también las manuales):
//   node scripts/rellenar-fotos-pexels.mjs --forzar-todas
//
// Requiere en .env.local:
//   PEXELS_API_KEY=...
//   SUPABASE_SERVICE_ROLE_KEY=...
//   NEXT_PUBLIC_SUPABASE_URL=...
//
// IMPORTANTE: usa la service_role key porque necesita permiso de escritura
// (tus políticas RLS solo permiten SELECT con la anon key). No subas esta
// clave a git ni la uses en código de cliente/navegador.

import { createClient } from "@supabase/supabase-js";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

const PEXELS_API_KEY = process.env.PEXELS_API_KEY;
const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!PEXELS_API_KEY || !SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error(
    "❌ Faltan variables de entorno. Revisa PEXELS_API_KEY, NEXT_PUBLIC_SUPABASE_URL y SUPABASE_SERVICE_ROLE_KEY en tu .env.local"
  );
  process.exit(1);
}

const forzarTodas = process.argv.includes("--forzar-todas");

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

// Quita acentos y caracteres raros para mejorar la búsqueda en Pexels
function limpiarParaBusqueda(texto) {
  return texto
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^\w\s]/g, "")
    .trim();
}

async function buscarFotoEnPexels(titulo) {
  const query = `${limpiarParaBusqueda(titulo)} food dish`;
  const url = `https://api.pexels.com/v1/search?query=${encodeURIComponent(
    query
  )}&per_page=3&orientation=landscape`;

  const respuesta = await fetch(url, {
    headers: { Authorization: PEXELS_API_KEY },
  });

  if (!respuesta.ok) {
    throw new Error(`Pexels respondió ${respuesta.status} para "${titulo}"`);
  }

  const datos = await respuesta.json();

  if (!datos.photos || datos.photos.length === 0) {
    return null;
  }

  // "large" da buena calidad sin ser un archivo enorme
  return datos.photos[0].src.large;
}

async function main() {
  console.log(
    forzarTodas
      ? "⚠️  Modo --forzar-todas: se sobrescribirán TODAS las fotos, incluidas las manuales.\n"
      : "ℹ️  Modo normal: solo se rellenarán recetas sin foto.\n"
  );

  console.log("📥 Cargando recetas desde Supabase...");

  const { data: todasLasRecetas, error } = await supabase
    .from("recetas")
    .select("id, titulo, foto")
    .order("id", { ascending: true });

  if (error) {
    console.error("❌ Error cargando recetas:", error.message);
    process.exit(1);
  }

  // Si no se fuerza, nos quedamos solo con las que no tienen foto (null o vacío)
  const recetas = forzarTodas
    ? todasLasRecetas
    : todasLasRecetas.filter((r) => !r.foto || r.foto.trim() === "");

  if (recetas.length === 0) {
    console.log("✅ No hay recetas pendientes de foto. Todo al día.");
    return;
  }

  console.log(`🔎 ${recetas.length} receta(s) a procesar. Buscando fotos en Pexels...\n`);

  let actualizadas = 0;
  let sinResultado = 0;

  for (const receta of recetas) {
    try {
      const fotoUrl = await buscarFotoEnPexels(receta.titulo);

      if (!fotoUrl) {
        console.warn(`⚠️  Sin resultados en Pexels para: "${receta.titulo}" (id ${receta.id})`);
        sinResultado++;
        continue;
      }

      const { error: updateError } = await supabase
        .from("recetas")
        .update({ foto: fotoUrl })
        .eq("id", receta.id);

      if (updateError) {
        console.error(`❌ Error guardando foto de "${receta.titulo}":`, updateError.message);
        continue;
      }

      console.log(`✅ ${receta.titulo} → ${fotoUrl}`);
      actualizadas++;
    } catch (err) {
      console.error(`❌ Error con "${receta.titulo}":`, err.message);
    }

    // Pequeña pausa para no saturar la API de Pexels (200 peticiones/hora en el plan gratuito)
    await new Promise((resolve) => setTimeout(resolve, 300));
  }

  console.log(`\n🎉 Listo. ${actualizadas} recetas actualizadas, ${sinResultado} sin resultado en Pexels.`);
}

main();
