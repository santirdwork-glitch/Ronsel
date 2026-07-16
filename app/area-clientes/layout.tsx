"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Great_Vibes } from "next/font/google";
import { AnimatePresence, motion } from "framer-motion";
import { supabase } from "@/lib/supabaseClient";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });

const ENLACES = [
  { href: "/area-clientes", etiqueta: "Inicio" },
  { href: "/area-clientes/menus", etiqueta: "Menús" },
  { href: "/area-clientes/recetas", etiqueta: "Recetas" },
  { href: "/area-clientes/videos", etiqueta: "Vídeos" },
];

export default function AreaClientesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [cargando, setCargando] = useState(true);
  const [menuAbierto, setMenuAbierto] = useState(false);

  useEffect(() => {
    const comprobarAcceso = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const userId = sessionData.session?.user.id;

      if (!userId) {
        router.push("/login");
        return;
      }

      const { data: perfil, error } = await supabase
        .from("perfiles")
        .select("activo")
        .eq("id", userId)
        .single();

      if (error || !perfil || !perfil.activo) {
        router.push("/login");
        return;
      }

      setCargando(false);
    };

    comprobarAcceso();
  }, [router]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  if (cargando) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#28372F]">
        <p className="text-sm uppercase tracking-widest text-[#B9C2BB]">
          Cargando…
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#2d3b30] text-[#F1ECE1]">
      {/* ============ NAVEGACIÓN COMPARTIDA (zona clientes) ============ */}
      <nav className="relative bg-[#112018] px-6 py-6 shadow-md">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className={`${greatVibes.className} text-3xl text-[#D8C9A3]`}
          >
            Ronsel
          </Link>

          {/* Enlaces: visibles en pantallas medianas en adelante */}
          <div className="hidden items-center gap-8 text-sm uppercase tracking-widest text-[#F1ECE1] md:flex">
            {ENLACES.map((enlace) => (
              <Link
                key={enlace.href}
                href={enlace.href}
                className="transition-colors duration-200 hover:text-white"
              >
                {enlace.etiqueta}
              </Link>
            ))}
            <button
              onClick={handleLogout}
              className="transition-colors duration-200 hover:text-white"
            >
              Cerrar sesión
            </button>
          </div>

          {/* Botón hamburguesa: visible solo en móvil/tablet pequeña */}
          <button
            onClick={() => setMenuAbierto((abierto) => !abierto)}
            aria-label={menuAbierto ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={menuAbierto}
            className="flex h-8 w-8 flex-col items-center justify-center gap-1.5 md:hidden"
          >
            <motion.span
              animate={
                menuAbierto
                  ? { rotate: 45, y: 6.5 }
                  : { rotate: 0, y: 0 }
              }
              className="h-[2px] w-6 bg-[#F1ECE1]"
            />
            <motion.span
              animate={{ opacity: menuAbierto ? 0 : 1 }}
              className="h-[2px] w-6 bg-[#F1ECE1]"
            />
            <motion.span
              animate={
                menuAbierto
                  ? { rotate: -45, y: -6.5 }
                  : { rotate: 0, y: 0 }
              }
              className="h-[2px] w-6 bg-[#F1ECE1]"
            />
          </button>
        </div>

        {/* Menú desplegable: solo en móvil/tablet pequeña */}
        <AnimatePresence>
          {menuAbierto && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col gap-1 pt-6 text-sm uppercase tracking-widest text-[#F1ECE1]">
                {ENLACES.map((enlace) => (
                  <Link
                    key={enlace.href}
                    href={enlace.href}
                    onClick={() => setMenuAbierto(false)}
                    className="rounded-lg px-2 py-3 transition-colors duration-200 hover:bg-white/5 hover:text-white"
                  >
                    {enlace.etiqueta}
                  </Link>
                ))}
                <button
                  onClick={() => {
                    setMenuAbierto(false);
                    handleLogout();
                  }}
                  className="rounded-lg px-2 py-3 text-left transition-colors duration-200 hover:bg-white/5 hover:text-white"
                >
                  Cerrar sesión
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ============ CONTENIDO DE CADA PÁGINA ============ */}
      {children}
    </div>
  );
}