"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Great_Vibes } from "next/font/google";
import { supabase } from "@/lib/supabaseClient";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });

export default function AreaClientesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [cargando, setCargando] = useState(true);

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
      <nav className="flex items-center justify-between bg-[#112018] px-6 py-6 shadow-md">
        <Link href="/" className={`${greatVibes.className} text-3xl text-[#D8C9A3]`}>
          Ronsel
        </Link>
        <div className="flex items-center gap-8 text-sm uppercase tracking-widest text-[#F1ECE1]">
          <Link href="/area-clientes" className="transition-colors duration-200 hover:text-white">
            Inicio
          </Link>
          <Link href="/area-clientes/menus" className="transition-colors duration-200 hover:text-white">
            Menús
          </Link>
          <Link href="/area-clientes/recetas" className="transition-colors duration-200 hover:text-white">
            Recetas
          </Link>
          <Link href="/area-clientes/videos" className="transition-colors duration-200 hover:text-white">
            Vídeos
          </Link>
          <button
            onClick={handleLogout}
            className="transition-colors duration-200 hover:text-white"
          >
            Cerrar sesión
          </button>
        </div>
      </nav>

      {/* ============ CONTENIDO DE CADA PÁGINA ============ */}
      {children}
    </div>
  );
}