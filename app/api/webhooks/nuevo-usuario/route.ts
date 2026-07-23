import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  // 1. Comprobamos que la llamada viene realmente de Supabase, no de cualquiera
  const secretRecibido = request.headers.get("x-webhook-secret");
  if (secretRecibido !== process.env.WEBHOOK_SECRET) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const payload = await request.json();

  // El webhook de Supabase manda algo así:
  // { type: "INSERT", table: "users", schema: "auth", record: { email: "...", ... } }
  const email = payload?.record?.email;

  if (!email) {
    return NextResponse.json({ error: "Sin email en el payload" }, { status: 400 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Ronsel <bienvenida@ronsel.com>",
      to: email,
      subject: "¡Bienvenido/a a Ronsel!",
      html: `
        <p>TODO: aquí va el texto del email de bienvenida.</p>
        <p>(Santi te pasará el texto definitivo más adelante — de momento esto es solo un placeholder para probar que el envío funciona.)</p>
      `,
    });

    // Resend no siempre lanza una excepción si algo falla: a veces devuelve
    // { data: null, error: {...} } sin más. Hay que comprobarlo explícitamente.
    if (error) {
      console.error("Resend devolvió un error:", error);
      return NextResponse.json({ error: error.message ?? "Error de Resend" }, { status: 500 });
    }

    console.log("Email enviado correctamente, id:", data?.id);
    return NextResponse.json({ ok: true, id: data?.id });
  } catch (error) {
    console.error("Error enviando email de bienvenida:", error);
    return NextResponse.json({ error: "Error enviando email" }, { status: 500 });
  }
}