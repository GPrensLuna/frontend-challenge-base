/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import ErrorComponent from "@/components/404/ErrorComponent";

export default function NotFound(): JSX.Element {
  return <ErrorComponent message={" Error 404"} redirectPath={"/"} />;
}
