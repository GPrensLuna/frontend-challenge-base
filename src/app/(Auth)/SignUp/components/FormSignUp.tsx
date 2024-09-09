"use client";
import { useTransition } from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import { Button } from "@/components/ui/button";
import {
  SignUpData,
  SignUpFormValues,
  SignUpSchema,
  SignUpValue,
} from "../validations";
import {
  errorToast,
  successToast,
  useLoadingToast,
} from "@/components/Alert/ToastSonner";
import { useSignUp } from "../hook/useSignUp";

const FormSignUp = (): JSX.Element => {
  const route = useRouter();
  const [isPending, startTransition] = useTransition();

  const onSubmit = (
    values: SignUpFormValues,
    actions: FormikHelpers<SignUpFormValues>,
  ): void => {
    startTransition(async () => {
      try {
        const { message } = await useSignUp(values);
        actions.resetForm();
        route.push(process.env.URL_LOGIN ?? "");
        route.refresh();
        successToast(message || "");
      } catch {
        errorToast("Error desconocido");
      }
    });
  };

  useLoadingToast(isPending);

  return (
    <article className="min-h-[700px] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-md w-full space-y-8 bg-gray-300/75 dark:bg-slate-600/90 p-10 rounded-xl">
        <h1 className="uppercase text-3xl">Iniciar sesión</h1>

        <Formik
          initialValues={SignUpValue}
          validationSchema={SignUpSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className="space-y-8 ">
              {SignUpData.map(
                ({ name, title, placeholder, type, required }) => (
                  <div key={name}>
                    <label
                      htmlFor={name}
                      className="block text-sm font-medium text-gray-700 dark:text-white uppercase"
                    >
                      {title} {required && "*"}
                    </label>
                    <Field
                      id={name}
                      name={name}
                      type={type}
                      placeholder={placeholder}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                    <ErrorMessage
                      name={name}
                      component="p"
                      className="mt-1 text-sm text-error"
                    />
                  </div>
                ),
              )}
              <div className="flex items-center justify-between">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full inline-flex dark:text-black font-bold items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm text-#282828 hover:text-white bg-primary hover:bg-primary p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {isPending ? "Iniciando sesión..." : "Iniciar sesión"}
                </Button>
              </div>
            </Form>
          )}
        </Formik>
      </section>
    </article>
  );
};

export default FormSignUp;
