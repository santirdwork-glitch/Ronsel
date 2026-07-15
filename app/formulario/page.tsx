"use client";

import { useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { supabase } from "@/lib/supabaseClient";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

function FormularioContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const planInicial = searchParams.get("plan") || "Empieza";

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [plan, setPlan] = useState(planInicial);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setCargando(true);

    // 1. Creamos el usuario en Supabase Auth (email + contraseña)
    const { data, error: errorAuth } = await supabase.auth.signUp({
      email,
      password,
    });

    if (errorAuth) {
      setError(errorAuth.message);
      setCargando(false);
      return;
    }

    const userId = data.user?.id;

    if (!userId) {
      setError("No se pudo crear el usuario. Inténtalo de nuevo.");
      setCargando(false);
      return;
    }

    // 2. Creamos su fila en la tabla perfiles, con el mismo id
    const { error: errorPerfil } = await supabase.from("perfiles").insert({
      id: userId,
      nombre,
      email,
      plan,
      activo: false,
    });

    if (errorPerfil) {
      setError(errorPerfil.message);
      setCargando(false);
      return;
    }

    // 3. Todo correcto: redirigimos a /gracias con el plan elegido
    router.push(`/gracias?plan=${plan}`);
  };

  return (
    <div className="min-h-screen bg-[#FBF3E7] text-[#1F1E1B]">
      {/* ============ NAVEGACIÓN ============ */}
      <nav className="flex items-center justify-center border-b border-black/10 px-6 py-8">
        <Link href="/" className={`${greatVibes.className} text-4xl text-[#2F6E68]`}>
          Ronsel
        </Link>
      </nav>

      {/* ============ FORMULARIO ============ */}
      <section className="mx-auto max-w-xl px-6 py-24">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#5b5b52]">
          Únete a Ronsel
        </p>
        <h1
          className={`${playfair.className} mb-10 italic leading-[1] text-[#1F1E1B]`}
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Crea tu cuenta
        </h1>

        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div>
            <label className="mb-2 block text-sm uppercase tracking-widest text-[#5b5b52]">
              Nombre
            </label>
            <input
              type="text"
              required
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              className="w-full border-b border-black/20 bg-transparent py-3 text-lg text-[#1F1E1B] outline-none focus:border-[#2F6E68]"
            />
          </div>

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
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full border-b border-black/20 bg-transparent py-3 text-lg text-[#1F1E1B] outline-none focus:border-[#2F6E68]"
            />
            <p className="mt-2 text-sm text-[#5b5b52]">Mínimo 6 caracteres.</p>
          </div>

          <div>
            <label className="mb-2 block text-sm uppercase tracking-widest text-[#5b5b52]">
              Plan
            </label>
            <select
              value={plan}
              onChange={(e) => setPlan(e.target.value)}
              className="w-full border-b border-black/20 bg-transparent py-3 text-lg text-[#1F1E1B] outline-none focus:border-[#2F6E68]"
            >
              <option value="Empieza">Empieza — 9,99€/mes</option>
              <option value="Avanza">Avanza — 19,99€/mes</option>
              <option value="Transforma">Transforma — 29,99€/mes</option>
            </select>
          </div>

          {error && (
            <p className="text-base text-[#E8836C]">{error}</p>
          )}

          <button
            type="submit"
            disabled={cargando}
            className="mt-4 bg-[#2F6E68] py-5 text-sm font-medium uppercase tracking-widest text-white transition-opacity duration-300 hover:opacity-90 disabled:opacity-50"
          >
            {cargando ? "Creando tu cuenta…" : "Crear cuenta"}
          </button>
        </form>
      </section>
    </div>
  );
}

export default function Formulario() {
  return (
    <Suspense fallback={null}>
      <FormularioContent />
    </Suspense>
  );
}