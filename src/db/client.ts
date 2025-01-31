// src/db/client.ts
import { createClient } from "@libsql/client";

const client = createClient({
  url: import.meta.env.DATABASE_URL ?? "",
  authToken: import.meta.env.DATABASE_TOKEN ?? "",
});

export const addUser = async (name: string, email: string) => {
  try {
    await client.execute({
      sql: "INSERT INTO users (name, email) VALUES (?, ?)",
      args: [name, email],
    });
  } catch (error) {
    console.error("Database error:", error);
    throw error; // Reenvía el error para que se muestre en el cliente
  }
};
