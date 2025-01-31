import React, { useRef, useState } from "react";
// import { sendWelcomeEmail } from "../lib/brevo";
import clientData from "../data/config";
const { secureMessage } = clientData;
export default function RegisterBox() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [errorMessages, setErrorMessages] = useState("");

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Validar los valores de las referencias
    const name = nameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";

    if (!name || !email) {
      setErrorMessages("Por favor, rellena todos los campos");
      return;
    }

    try {
      const userRes = await fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email }),
      });

      if (userRes.ok) {
        const emailRes = await fetch("/api/sendEmails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
        });
        if (!emailRes.ok) {
          setErrorMessages(
            "Hubo un error al procesar tu solicitud. Intenta nuevamente."
          );
          return;
        }
        window.location.href = "/thanks";
      } else {
        setErrorMessages("Ese email ya está registrado");
      }
    } catch (error) {
      setErrorMessages(
        "Hubo un error al procesar tu solicitud. Intenta nuevamente."
      );
    }
  };

  return (
    <>
      <form className='flex flex-col gap-4 rounded p-4 bg-transparent w-full max-w-[400px] sm:w-[350px] md:w-[400px] items-center justify-center mx-auto'>
        <input
          ref={nameRef}
          type='text'
          id='name'
          name='name'
          required
          placeholder='Tu nombre*'
          className='w-full p-2 border rounded'
        />
        <input
          ref={emailRef}
          type='email'
          id='email'
          name='email'
          required
          placeholder='Tu email*'
          className='w-full p-2 border rounded'
        />
        <button
          type='submit'
          className='p-2 text-white border border-black rounded hover:animate-pop bg-accent'
          onClick={handleSubmit}
        >
          Registrarme
        </button>
        <p className='text-center text-xs/3'>{secureMessage}</p>
      </form>
      <div
        className={`h-6 flex items-center justify-center text-center transition-all duration-500 ease-in-out  ${
          errorMessages
            ? "opacity-100 translate-y-0"
            : "opacity-0 -translate-y-2"
        } text-red-600`}
      >
        {errorMessages}
      </div>
    </>
  );
}
