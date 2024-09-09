/* eslint-disable @typescript-eslint/naming-convention */
import { SignUpFormValues } from "../validations";

export async function useSignUp(values: SignUpFormValues): Promise<{
  message: string;
}> {
  try {
    const response = await fetch(`${process.env.API_URL_BACKEND}/user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
      credentials: "include",
    });

    if (!response.ok) {
      return {
        message: "Error desconocido",
      };
    }

    const data = await response.json();

    document.cookie = `token=${data.data.id}; path=/; secure; SameSite=Strict`;

    return {
      message: "Inicio de sesión exitoso",
    };
  } catch {
    return {
      message: "Error al iniciar sesión",
    };
  }
}
