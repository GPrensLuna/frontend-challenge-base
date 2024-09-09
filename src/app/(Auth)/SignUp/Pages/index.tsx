/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { useState } from "react";
import FormSignUp from "../components/FormSignUp";

const PageSignUp: React.FC = (): JSX.Element => {
  const [showForm, setShowForm] = useState<boolean>(false);

  const handleRegisterClick = (): void => {
    setShowForm(true);
  };

  return !showForm ? (
    <article className="flex flex-col items-center text-center justify-center w-full h-[700]">
      <button
        onClick={handleRegisterClick}
        className="px-6 py-3 border border-gray-300 rounded-md shadow-sm bg-[#F0B90B] text-white hover:bg-[#e6b83a] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F0B90B] text-xl w-full sm:w-[350px] lg:w-[400px]"
      >
        Register with your email
      </button>
      <p className="text-white text-sm sm:text-base font-semibold">
        For any questions reach out to support@Quickbetdmovies.com
      </p>
    </article>
  ) : (
    <div className="container min-h-[700px] flex flex-col  w-full items-center justify-center p-4">
      <FormSignUp />
    </div>
  );
};

export default PageSignUp;
