"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { supabase } from "@/lib/supabaseClient";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

export default function Login() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");
  const [pendiente, setPendiente] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setPendiente(false);
    setCargando(true);

    // 1. Comprobamos email y contraseña
    const { data, error: errorLogin } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (errorLogin) {
      setError("Email o contraseña incorrectos.");
      setCargando(false);
      return;
    }

    const userId = data.user?.id;

    // 2. Comprobamos si su perfil está activo
    const { data: perfil, error: errorPerfil } = await supabase
      .from("perfiles")
      .select("activo")
      .eq("id", userId)
      .single();

    if (errorPerfil || !perfil) {
      setError("No se ha encontrado tu perfil. Contacta con nosotros.");
      setCargando(false);
      return;
    }

    if (!perfil.activo) {
      setPendiente(true);
      setCargando(false);
      return;
    }

    // 3. Todo correcto: al área de clientes
    router.push("/area-clientes");
  };

  return (
    <div className="min-h-screen bg-[#FBF3E7] text-[#1F1E1B]">
      {/* ============ NAVEGACIÓN ============ */}
      <nav className="flex items-center justify-center border-b border-black/10 px-6 py-8">
        <Link href="/" className={`${greatVibes.className} text-4xl text-[#2F6E68]`}>
          Ronsel
        </Link>
      </nav>

      {/* ============ LOGIN ============ */}
      <section className="mx-auto max-w-xl px-6 py-24">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#5b5b52]">
          Zona de clientes
        </p>
        <h1
          className={`${playfair.className} mb-10 italic leading-[1] text-[#1F1E1B]`}
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Iniciar sesión
        </h1>

        {pendiente ? (
          <div className="border border-black/10 bg-white px-8 py-10">
            <p className="mb-4 text-lg font-semibold text-[#1F1E1B]">
              Tu acceso está pendiente de confirmación de pago
            </p>
            <p className="text-lg leading-relaxed text-[#5b5b52]">
              En cuanto confirmemos tu Bizum, activaremos tu cuenta y podrás
              entrar con normalidad. Si crees que ya deberías tener acceso,
              contacta con nosotros.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            <div>
              <label className="mb-2 block text-sm uppercase tracking-widest text-[#5b5b52]">
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-black/20 bg-transparent py-3 text-lg text-[#1F1E1B] outline-none focus:border-[#2F6E68]"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm uppercase tracking-widest text-[#5b5b52]">
                Contraseña
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-b border-black/20 bg-transparent py-3 text-lg text-[#1F1E1B] outline-none focus:border-[#2F6E68]"
              />
            </div>

            {error && <p className="text-base text-[#E8836C]">{error}</p>}

            <button
              type="submit"
              disabled={cargando}
              className="mt-4 bg-[#2F6E68] py-5 text-sm font-medium uppercase tracking-widest text-white transition-opacity duration-300 hover:opacity-90 disabled:opacity-50"
            >
              {cargando ? "Entrando…" : "Entrar"}
            </button>

            <p className="text-center text-base text-[#5b5b52]">
              ¿Aún no tienes cuenta?{" "}
              <Link href="/formulario" className="font-semibold text-[#2F6E68]">
                Regístrate aquí
              </Link>
            </p>
          </form>
        )}
      </section>
    </div>
  );
}