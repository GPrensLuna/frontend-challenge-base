/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import { SignInFormValues } from "../validations";

export async function useSignIn(values: SignInFormValues): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      },
    );

    if (!response.ok) {
      const errorData = await response.json();
      return {
        success: false,
        message: errorData.error || "Error desconocido",
      };
    }

    const data = await response.json();

    document.cookie = `token=${data.data.id}; path=/; secure; SameSite=Strict`;

    return {
      success: true,
      message: data.message || "Inicio de sesión exitoso",
    };
  } catch {
    return {
      success: false,
      message: "Error al iniciar sesión",
    };
  }
}
