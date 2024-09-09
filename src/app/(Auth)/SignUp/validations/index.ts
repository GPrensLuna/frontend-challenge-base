/* eslint-disable prettier/prettier */
import { object, string } from "yup";

export const SignUpValue = {
  email: "",
  password: "",
  username: "",
};

export interface SignUpFormValues {
  email: string;
  username: string;
  password: string;
}

export const SignUpSchema = object({
  email: string()
    .email("El email debe ser válido")
    .required("El email es requerido"),
  username: string().required("El username es requerido"),
  password: string()
    .required("La contraseña es requerida")
    .min(8, "La contraseña debe tener al menos 8 caracteres")
    .matches(
      /[a-z]/,
      "La contraseña debe contener al menos una letra minúscula",
    )
    .matches(
      /[A-Z]/,
      "La contraseña debe contener al menos una letra mayúscula",
    )
    .matches(/[0-9]/, "La contraseña debe contener al menos un número")
    .matches(
      /[@$!%*?&]/,
      "La contraseña debe contener al menos un símbolo (por ejemplo: @, $, !, %, *, ?, &)",
    ),
});

export const SignUpData = [
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
  {
    id: "username",
    label: "username",
    title: "username",
    name: "username",
    placeholder: "username",
    required: true,
    type: "text",
    value: "",
    error: "",
    styleInput: "",
    StyleLabel: "",
  },
];
