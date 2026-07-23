import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

// Cambia esto si la URL de tu área de clientes es distinta
const URL_AREA_CLIENTES = "https://estudioronselvigo.com/area-clientes";

function generarHtmlBienvenida(nombre: string | null) {
  const saludo = nombre ? `Hola ${nombre},` : "Hola,";

  return `
  <!DOCTYPE html>
  <html lang="es">
    <body style="margin:0; padding:0; background-color:#0f1512; font-family: Georgia, 'Times New Roman', serif;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#0f1512; padding:40px 0;">
        <tr>
          <td align="center">
            <table role="presentation" width="100%" style="max-width:520px; background-color:#1E2A24; border-radius:16px; overflow:hidden;">
              <tr>
                <td style="padding:48px 40px 24px 40px;">
                  <p style="margin:0 0 8px 0; font-size:12px; letter-spacing:3px; text-transform:uppercase; color:#B9C2BB;">
                    Tu contenido
                  </p>
                  <h1 style="margin:0 0 28px 0; font-size:32px; font-style:italic; font-weight:600; color:#dadada; line-height:1.1;">
                    Bienvenido/a a Ronsel
                  </h1>

                  <p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#F1ECE1;">
                    ${saludo}
                  </p>

                  <p style="margin:0 0 18px 0; font-size:16px; line-height:1.6; color:#F1ECE1;">
                    En cuanto recibamos el pago tendrás un espacio pensado para cuidarte de verdad: nutrición, movimiento y bienestar, sin complicaciones y con acompañamiento real.
                  </p>

                  <p style="margin:0 0 32px 0; font-size:16px; line-height:1.6; color:#F1ECE1;">
                    En tu área de clientes encontrarás tus menús semanales, recetas y todo el contenido pensado para ti.
                  </p>

                  <table role="presentation" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="border-radius:999px; background-color:#D8C9A3;">
                        <a href="${URL_AREA_CLIENTES}"
                           style="display:inline-block; padding:14px 32px; font-size:14px; font-weight:600; color:#1E2A24; text-decoration:none; border-radius:999px;">
                          Entrar a mi área de clientes
                        </a>
                      </td>
                    </tr>
                  </table>

                  <p style="margin:40px 0 0 0; font-size:14px; line-height:1.6; color:#B9C2BB;">
                    Si tienes cualquier duda, simplemente responde a este email — estamos aquí para ayudarte.
                  </p>

                  <p style="margin:24px 0 0 0; font-size:14px; line-height:1.6; color:#B9C2BB;">
                    Un abrazo,<br />
                    El equipo de Ronsel
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
  </html>
  `;
}

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

  // Si algún día pides el nombre en el registro, Supabase suele guardarlo aquí.
  // Si no lo usas, esto queda en null y el email saluda de forma genérica.
  const nombre = payload?.record?.raw_user_meta_data?.full_name ?? null;

  if (!email) {
    return NextResponse.json({ error: "Sin email en el payload" }, { status: 400 });
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "Ronsel <bienvenida@estudioronselvigo.com>",
      to: email,
      subject: "Bienvenido/a a Ronsel 🌿",
      html: generarHtmlBienvenida(nombre),
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