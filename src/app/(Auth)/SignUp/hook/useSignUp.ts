/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { SignUpFormValues } from "../validations";
import { errorToast, successToast } from "@/components/Alert/ToastSonner";

interface SignUpResponse {
  message: string;
  success: boolean;
}

export function useSignUp(): {
  signUp: (values: SignUpFormValues) => Promise<SignUpResponse>;
} {
  const signUp = async (values: SignUpFormValues): Promise<SignUpResponse> => {
    try {
      const response = await fetch(`/api/auth/SignUp`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();

        errorToast(
          "An unexpected error occurred while processing your request.",
        );

        return {
          message:
            errorData.message ??
            "An unexpected error occurred while processing your request.",
          success: false,
        };
      }

      await response.json();
      successToast("Usuario registrado con éxito.");

      return {
        message: "Usuario registrado con éxito.",
        success: true,
      };
    } catch {
      errorToast("An unexpected error occurred while processing your request.");

      return {
        message: "An unexpected error occurred while processing your request.",
        success: false,
      };
    }
  };

  return { signUp };
}
