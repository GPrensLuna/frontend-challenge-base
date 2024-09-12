/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
import { errorToast, successToast } from "@/components/Alert/ToastSonner";
import { SignInFormValues } from "../validations";
import { useSession } from "@/provider/SessionProvider";

interface SignInResponse {
  message: string;
  success: boolean;
}

export function useSignIn(): {
  signIn: (values: SignInFormValues) => Promise<SignInResponse>;
} {
  const { fetchProfile } = useSession();

  const signIn = async (values: SignInFormValues): Promise<SignInResponse> => {
    try {
      const response = await fetch(`/api/auth/SignIn`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
        credentials: "include",
      });

      if (!response.ok) {
        const errorMessage =
          "An unexpected error occurred while processing your request.";

        errorToast(errorMessage);

        return {
          message: errorMessage,
          success: false,
        };
      }

      fetchProfile();

      successToast("Successfully signed in. Welcome!");

      return {
        message: "Successfully signed in. Welcome!",
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

  return { signIn };
}
