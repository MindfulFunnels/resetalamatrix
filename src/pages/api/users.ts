// /api/users.ts
import { type APIRoute } from "astro";
import { addUser } from "../../db/client";

export const POST: APIRoute = async ({ request }) => {
  try {
    const { name, email } = await request.json();
    await addUser(name, email);
  } catch (error) {
    return new Response("Error: " + error, { status: 400 });
  }

  return new Response("ok", { status: 200 });
};
