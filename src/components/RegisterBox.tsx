import React, { useRef, useState } from "react";
import clientData from "../data/config";

const { secureMessage } = clientData;

export default function RegisterBox() {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const [errorMessages, setErrorMessages] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // Estado para el spinner

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    // Validar los valores de las referencias
    const name = nameRef.current?.value.trim() || "";
    const email = emailRef.current?.value.trim() || "";

    if (!name || !email) {
      setErrorMessages("Por favor, rellena todos los campos");
      return;
    }

    setIsSubmitting(true); // Mostrar el spinner

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
          setIsSubmitting(false); // Ocultar el spinner
          return;
        }
        window.location.href = "/thanks";
      } else {
        setErrorMessages("Ese email ya está registrado");
        setIsSubmitting(false); // Ocultar el spinner
      }
    } catch (error) {
      setErrorMessages(
        "Hubo un error al procesar tu solicitud. Intenta nuevamente."
      );
      setIsSubmitting(false); // Ocultar el spinner
    }
  };

  return (
    <form className='flex flex-col gap-6 p-6 rounded-lg bg-tra shadow-lg w-full max-w-[500px] items-center justify-center mx-auto'>
      <input
        ref={nameRef}
        type='text'
        id='name'
        name='name'
        required
        placeholder='Tu nombre*'
        className='w-full p-4 text-lg border border-[#801FC6] rounded-lg bg-[#1B032E] text-white focus:outline-none focus:ring-2 focus:ring-[#A85FE8] focus:ring-offset-2 focus:ring-offset-[#2C0A4A]'
      />
      <input
        ref={emailRef}
        type='email'
        id='email'
        name='email'
        required
        placeholder='Tu email*'
        className='w-full p-4 text-lg border border-[#801FC6] rounded-lg bg-[#1B032E] text-white focus:outline-none focus:ring-2 focus:ring-[#A85FE8] focus:ring-offset-2 focus:ring-offset-[#2C0A4A]'
      />
      {isSubmitting ? (
        <div role='status'>
          <svg
            aria-hidden='true'
            className='inline w-10 h-10 text-gray-200 animate-spin dark:text-gray-600 fill-red-600'
            viewBox='0 0 100 101'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z'
              fill='currentColor'
            ></path>
            <path
              d='M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z'
              fill='currentFill'
            ></path>
          </svg>
          <span className='sr-only'>Loading...</span>
        </div>
      ) : (
        <button
          type='submit'
          className='w-full px-10 py-4 text-lg font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 hover:scale-105 transition-transform duration-300'
          onClick={handleSubmit}
        >
          Registrarme
        </button>
      )}
      <p className='text-center text-[10px] text-white'>{secureMessage}</p>
    </form>
  );
}
