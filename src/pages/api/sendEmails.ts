import type { APIRoute } from "astro";
import brevo from "@getbrevo/brevo";
import clientData from "../../data/config";

const { title } = clientData;

// Configuración de Brevo
const emailApiClient = new brevo.TransactionalEmailsApi();

emailApiClient.setApiKey(
  brevo.TransactionalEmailsApiApiKeys.apiKey,
  import.meta.env.BREVO_API_KEY
);

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email } = await request.json();

    if (!name || !email) {
      return new Response(
        JSON.stringify({ error: "Faltan parámetros requeridos" }),
        { status: 400, headers: { "Content-Type": "application/json" } }
      );
    }

    const smtpEmail = new brevo.SendSmtpEmail();
    smtpEmail.subject = "Bienvenido al curso";
    smtpEmail.to = [{ email: email, name: name }];
    smtpEmail.htmlContent = `
    <html>
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Hola ${name}</title>
      </head>
      <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
          <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #ffffff; max-width: 600px; margin: 0 auto;">
              <tr>
                  <td style="padding: 20px; text-align: center;">
                      <button style="background-color: #333; color: white; padding: 10px 20px; border: none; cursor: pointer;">Log in</button>
                  </td>
              </tr>
              <tr>
                  <td style="padding: 20px; text-align: left;">
                      <h2>Promocionar un contenido interesante</h2>
                      <p>Utilice esta área para presentar sus noticias o últimas mejoras.</p>
                      <img src="https://i.ibb.co/rWkK9Fg/cover.png" alt="Imagen" style="display: block; margin: 10px 0; width: 100%; max-width: 150px;">
                  </td>
              </tr>
              <tr>
                  <td style="padding: 20px;">
                      <h3>Comparta el subtítulo más importante de su historia</h3>
                      <p>Déle continuidad a su historia compartiendo algunas detalles interesantes y algunas palabras finales con claridad.</p>
                      <img src="https://i.ibb.co/rWkK9Fg/cover.png" alt="Imagen" style="display: block; margin: 10px 0; width: 100%; max-width: 300px;">
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
    </html>`;
    smtpEmail.sender = {
      name: title,
      email: "gallardolucas003@gmail.com",
    };

    await emailApiClient.sendTransacEmail(smtpEmail);

    return new Response(
      JSON.stringify({ message: "Correo enviado exitosamente" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error al enviar el correo:", error);
    return new Response(
      JSON.stringify({ error: "Error al enviar el correo" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
};
