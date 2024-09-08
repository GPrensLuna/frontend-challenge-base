import { object, string } from "yup";

export const SignInValue = {
  email: "",
  password: "",
};

export interface SignInFormValues {
  email: string;
  password: string;
}

export const SignInSchema = object({
  email: string().required("El email es requerido"),
  password: string().required("La contraseña es requerido"),
});

export const SignInData = [
  {
    id: "email",
    label: "email",
    title: "email",
    name: "email",
    placeholder: "email",
    required: true,
    type: "text",
    value: "",
    error: "",
    styleInput: "",
    StyleLabel: "",
  },
  {
    id: "password",
    label: "password",
    title: "password",
    name: "password",
    placeholder: "password",
    required: true,
    type: "password",
    value: "",
    error: "",
    styleInput: "",
    StyleLabel: "",
  },
];
