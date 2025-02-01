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
      sender: { name: "Lucas", email: "gallardolucas003@gmail.com" },
      to: [{ email, name }],
      subject: `¡Hola ${name}! Bienvenido a ${title}`,
      htmlContent: `
<html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hola ${name}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #801FC6; color: white;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #000000; max-width: 600px; margin: 0 auto;">
              <tr>
                  <td style="padding: 20px; text-align: center; align-items: center; justify-content: center; display: flex;">
                      <img src="https://luisgarre.com/wp-content/uploads/2021/04/logo-luis-garre-250-.jpg" alt="Imagen" style="display: block; margin: 10px 0; width: 100%; max-width: 300px;">
                  </td>
                </tr>
                <tr>
                    <td style="padding: 20px; text-align: center;">
                        <h1 style="color: #801FC6; font-size: 40px; font-family: Audiowide;">RESET A LA MATRIX</h1>
                        <p>Utilice esta área para presentar sus noticias o últimas mejoras.</p>
                  </td>
              </tr>
              <tr>
                  <td style="padding: 20px; text-align: left;">
                      <h2>Bienvenido ${name} a mi Masterclass</h2>
                      <p>Utilice esta área para presentar sus noticias o últimas mejoras.</p>
                      <img src="https://i.ibb.co/XxXMmFsb/58361.jpg" alt="Imagen" style="display: block; margin: 10px 0; width: 100%; max-width: 150px;">
                  </td>
              </tr>
              <tr>
                  <td style="padding: 20px;">
                      <h3>Comparta el subtítulo más importante de su historia</h3>
                      <p>Déle continuidad a su historia compartiendo algunas detalles interesantes y algunas palabras finales con claridad.</p>
                      <img src="https://i.ibb.co/gZT8Mb8B/464683279-10225260006878835-5834061997106450843-n.jpg" alt="Imagen" style="display: block; margin: 10px 0; width: 100%; max-width: 300px;">
                  </td>
              </tr>
              <tr>
                  <td style="padding: 20px;">
                      <h3>Describa a sus lectores cómo proceder para comenzar</h3>
                      <ol>
                          <li>Indique el tema o concepto que va a tratar.</li>
                          <li>Proporcione información relevante con hechos o contexto para ayudar a la audiencia a entender el tema.</li>
                          <li>Organice sus ideas destacando los puntos principales.</li>
                          <li>Concluya resumiendo los puntos clave o invitando a la audiencia a una mayor discusión.</li>
                      </ol>
                      <button style="background-color: #333; color: white; padding: 10px 20px; border: none; cursor: pointer;">Llamado a la acción</button>
                  </td>
              </tr>
              <tr>
                  <td style="padding: 20px; background-color: #333; color: white; text-align: center;">
                      <p>Dirección de la empresa</p>
                      <p>Email: contacto@empresa.com</p>
                      <p>Teléfono: +123456789</p>
                      <p><a href="#" style="color: white; text-decoration: none;">Desuscribirse</a></p>
                  </td>
              </tr>
          </table>
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

    console.log("Payload enviado a Brevo:", payload);
    console.log("Clave API:", apiKey);

    if (!response.ok) {
      const error = await response.json();
      console.error("Error al enviar correo:", error);
      throw new Error("Error en la API de Brevo");
    }

    const result = await response.json();
    console.log("Correo enviado exitosamente:", result);

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
