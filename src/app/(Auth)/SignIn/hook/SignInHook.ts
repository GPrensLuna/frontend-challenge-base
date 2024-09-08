import { Auth } from "@/auth";
import { InferType } from "yup";
import { SignInSchema } from "../validations";

interface SignInResponse {
  status: number;
  success: boolean;
  message: string;
}

export const SignInHook = async (
  // eslint-disable-next-line prettier/prettier
  values: InferType<typeof SignInSchema>,
): Promise<SignInResponse> => {
  try {
    await SignInSchema.validate(values, { abortEarly: false });

    await Auth.signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
    });

    return {
      status: 200,
      success: true,
      message: "Inicio de sesión exitoso",
    };
  } catch {
    return {
      status: 401,
      success: false,
      message: "Authentication failed. Please check your credentials.",
    };
  }
};
