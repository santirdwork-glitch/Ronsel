"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Great_Vibes, Playfair_Display } from "next/font/google";

const greatVibes = Great_Vibes({ subsets: ["latin"], weight: "400" });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600"],
  style: ["normal", "italic"],
});

const PRECIOS: Record<string, string> = {
  Empieza: "9,99",
  Avanza: "19,99",
  Transforma: "29,99",
};

function GraciasContent() {
  const searchParams = useSearchParams();
  const plan = searchParams.get("plan") || "Empieza";
  const precio = PRECIOS[plan] || PRECIOS["Empieza"];

  return (
    <div className="min-h-screen bg-[#FBF3E7] text-[#1F1E1B]">
      {/* ============ NAVEGACIÓN ============ */}
      <nav className="flex items-center justify-center border-b border-black/10 px-6 py-8">
        <Link href="/" className={`${greatVibes.className} text-4xl text-[#2F6E68]`}>
          Ronsel
        </Link>
      </nav>

      {/* ============ MENSAJE PRINCIPAL ============ */}
      <section className="mx-auto max-w-2xl px-6 py-24 text-center">
        <p className="mb-4 text-sm uppercase tracking-[0.3em] text-[#5b5b52]">
          Cuenta creada
        </p>
        <h1
          className={`${playfair.className} mb-8 italic leading-[1] text-[#1F1E1B]`}
          style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
        >
          ¡Ya casi está!
        </h1>
        <p className="mb-14 text-lg leading-relaxed text-[#5b5b52]">
          Tu cuenta se ha creado correctamente. Solo falta un paso para
          activar tu acceso a la zona de clientes.
        </p>

        {/* ============ INSTRUCCIONES DE PAGO ============ */}
        <div className="border border-black/10 bg-white px-8 py-12 text-left sm:px-14">
          <p className="mb-6 text-sm uppercase tracking-[0.3em] text-[#5b5b52]">
            Plan elegido
          </p>
          <p className={`${playfair.className} mb-10 text-3xl italic text-[#2F6E68]`}>
            {plan} — {precio}€/mes
          </p>

          <div className="flex flex-col gap-8 border-t border-black/10 pt-10">
            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#1F1E1B]">
                1. Haz el pago por Bizum
              </p>
              <p className="text-lg leading-relaxed text-[#5b5b52]">
                Envía <span className="font-semibold text-[#1F1E1B]">{precio}€</span> por
                Bizum al número{" "}
                <span className="font-semibold text-[#1F1E1B]">625 784 036</span>.
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#1F1E1B]">
                2. Esperamos la confirmación
              </p>
              <p className="text-lg leading-relaxed text-[#5b5b52]">
                En cuanto recibamos tu pago, activaremos tu acceso — normalmente
                en menos de 24 horas.
              </p>
            </div>

            <div>
              <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-[#1F1E1B]">
                3. Accede a tu zona de clientes
              </p>
              <p className="text-lg leading-relaxed text-[#5b5b52]">
                Cuando tu acceso esté activo, podrás entrar con el email y la
                contraseña que acabas de crear.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/login"
          className="mt-14 inline-block border border-[#1F1E1B] px-10 py-4 text-sm uppercase tracking-widest text-[#1F1E1B] transition-colors duration-300 hover:bg-[#1F1E1B] hover:text-white"
        >
          Ir a iniciar sesión
        </Link>
      </section>
    </div>
  );
}

export default function Gracias() {
  return (
    <Suspense fallback={null}>
      <GraciasContent />
    </Suspense>
  );
}