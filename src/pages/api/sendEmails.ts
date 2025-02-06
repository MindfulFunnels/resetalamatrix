import type { APIRoute } from "astro";
import * as dotenv from "dotenv";
import clientData from "../../data/config";

dotenv.config();

const { title } = clientData;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Faltan parámetros requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const apiKey = import.meta.env.BREVO_API_KEY;
    if (!apiKey) {
      throw new Error("Clave API de Brevo no está definida");
    }

    const payload = {
      sender: { name: "Luis Garre", email: "luisgarre3@gmail.com" },
      to: [{ email, name }],
      subject: `🚀 Estás dentro: Prepárate para la transformación que viviremos juntos - Luis Garre`,
      htmlContent: `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>RESET A LA MATRIX</title>
    <style>
        body {
            margin: 0;
            padding: 0;
            font-family: Arial, sans-serif;                        
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;  
            border: 1px solid #801FC6;
            border-radius: 10px;
        }
        .header {
            text-align: center;
            padding: 20px 0;
        }
        .header img {
            max-width: 300px;
            margin: 0 auto;
            border: 5px solid #801FC6;
            border-radius: 10px;
        }
        .cta {
            text-align: center;
            margin: 20px 0;
        }
        .cta a {
            background-color: #801FC6 !important;
            color: #000 !important;
            text-decoration: none;
            padding: 10px 20px;
            border-radius: 5px;
            display: inline-block;
        }
        .title {
            font-size: 3rem;
            font-family: Arial, sans-serif;
            text-align: center;
            color: #801FC6 !important;         
            margin: 20px 0;
        }
        .title span {
            color: #00ff00 !important;           
        }
        .footer {
            text-align: center;
            font-size: 14px;
            margin-top: 20px;
            color: #bbb !important;
        }
    </style>
</head>
<body style="background-color: transparent color: #000 !important;">
    <div class="container" style="background-color: transparent !important;">
        <h1 class="title" style="color: #801FC6 !important;">RESET A LA <span style="color: #00ff00 !important;">MATRIX</span></h1>
        <div class="content" style="color: #000 !important;">
            <p style="color: #000 !important;">¡Hola <strong style="color: #801FC6 !important;">${name}</strong>! 👋</p>
            <p style="color: #000 !important;">Tu despertar ha comenzado. Bienvenido/a a <strong style="color: #801FC6 !important;">RESET A LA MATRIX</strong>, el evento donde descubrirás cómo reprogramar tu mente, liberarte de los sistemas de control y manifestar una realidad alineada con tu verdadero propósito. 🌍✨</p>
            <p style="color: #000 !important;"><strong style="color: #801FC6 !important;">📅 Fecha del evento:</strong> 23/02/2025<br>
            <strong style="color: #801FC6 !important;">⏰ Hora:</strong> 🇪🇸 España 19:00hs | 🇦🇷 Argentina 15:00hs | 🇨🇴 Colombia 13:00hs | 🇲🇽 México 12:00hs<br>
            <strong style="color: #801FC6 !important;">📍 Acceso:</strong> Online (pronto recibirás el enlace)</p>
            <h3 style="color: #000 !important;">¿Qué te espera en RESET A LA MATRIX?</h3>
            <ul>
                <li style="color: #000 !important;">🔥 Descubrir cómo opera la Matrix y las claves para salir de su programación.</li>
                <li style="color: #000 !important;">🧠 Aprender a reprogramar tu subconsciente para manifestar abundancia y libertad.</li>
                <li style="color: #000 !important;">⚡ Activar tu energía cuántica para elevar tu frecuencia y tomar el control de tu vida.</li>
                <li style="color: #000 !important;">🔓 Romper creencias limitantes y expandir tu conciencia con herramientas prácticas.</li>
            </ul>
            <p style="color: #000 !important;">Este evento no es solo información, <strong style="color: #801FC6 !important;">es una experiencia transformadora</strong>. 🚀</p>
            <h3 style="color: #000 !important;">🔔 IMPORTANTE:</h3>
            <p style="color: #000 !important;">Para que aproveches al máximo esta oportunidad:</p>
            <ul>
                <li style="color: #000 !important;">✅ Únete al grupo privado de WhatsApp para recibir contenido exclusivo antes del evento 👉 <a href="https://chat.whatsapp.com/IzDBRVbnLPoE1NTgaCBmEN" style="color: #801FC6 !important;">Únete aquí</a></li>
                <li style="color: #000 !important;">✅ Añade el evento a tu calendario para no olvidarlo.</li>
                <li style="color: #000 !important;">✅ Estate atento/a a tu correo y a la comunidad de WhatsApp donde te enviaremos más detalles y materiales antes del evento.</li>
            </ul>
            <p style="color: #000 !important;"><strong style="color: #801FC6 !important;">⚠️ Prepárate</strong>, porque lo que viene cambiará tu forma de ver la realidad.</p>
        </div>
        <div class="header">
            <img src="https://i.ibb.co/GQKR5KFr/58361-Copy.jpg" alt="Luis Garre">
            <div class="cta">
                <a href="https://chat.whatsapp.com/IzDBRVbnLPoE1NTgaCBmEN"style="color: #fff !important;" >Únete al grupo de WhatsApp</a>
            </div>
        </div>
        <div class="footer">
            <p style="color: #000 !important;">Nos vemos muy pronto<br>
            <strong style="color: #801FC6 !important;">Luis Garre</strong></p>
        </div>
    </div>
</body>
</html>
`,
    };

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error("Error al enviar correo:", error);
      throw new Error("Error en la API de Brevo");
    }

    const result = await response.json();

    return new Response(
      JSON.stringify({ message: "Correo enviado exitosamente" }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return new Response(
      JSON.stringify({ error: "Error al enviar el correo" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
