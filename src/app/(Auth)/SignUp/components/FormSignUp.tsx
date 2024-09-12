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
import { useLoadingToast, errorToast } from "@/components/Alert/ToastSonner";
import { useSignUp } from "../hook/useSignUp";

const FormSignUp = (): JSX.Element => {
  const route = useRouter();
  const [isPending, startTransition] = useTransition();
  const { signUp } = useSignUp();

  const onSubmit = (
    values: SignUpFormValues,
    actions: FormikHelpers<SignUpFormValues>,
  ): void => {
    try {
      startTransition(async () => {
        const { message, success } = await signUp(values);
        if (success) {
          route.refresh();
        } else {
          errorToast(message);
        }
      });
    } catch (error) {
      errorToast("An unexpected error occurred.");
    } finally {
      actions.setSubmitting(false);
    }
  };

  useLoadingToast(isPending);

  return (
    <article className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <section className="max-w-md w-full space-y-8 p-10 rounded-xl bg-gray-300 dark:bg-slate-600">
        <h1 className="text-3xl font-bold text-gray-800 dark:text-white uppercase">
          Sign Up
        </h1>

        <Formik
          initialValues={SignUpValue}
          validationSchema={SignUpSchema}
          onSubmit={onSubmit}
        >
          {() => (
            <Form className="space-y-6">
              {SignUpData.map(
                ({ name, title, placeholder, type, required }) => (
                  <div key={name} className="space-y-1">
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
                      className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary focus:border-primary sm:text-sm"
                    />
                    <ErrorMessage
                      name={name}
                      component="p"
                      className="text-sm text-red-600"
                    />
                  </div>
                ),
              )}
              <div className="flex justify-center">
                <Button
                  type="submit"
                  disabled={isPending}
                  className="w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm text-white bg-primary hover:bg-primary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                >
                  {isPending ? "Registering..." : "Sign Up"}
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
