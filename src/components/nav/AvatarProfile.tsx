/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { Avatar } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import UserOffSVG from "./svg/UserOffSVG";
import SignIn from "@/app/(Auth)/SignIn/page";
import Image from "next/image";
import login from "./svg/login.png";
import { useState } from "react";
import FormSignUp from "@/app/(Auth)/SignUp/components/FormSignUp";

const AvatarProfile: React.FC = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(true);

  const toggleForm = (): void => {
    setShowSignIn(!showSignIn);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <article className="relative">
          <Avatar>
            <span className="flex items-center justify-center h-full w-full">
              <UserOffSVG />
            </span>
          </Avatar>
        </article>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="absolute right-0 top-0 w-[90vw] max-w-[1220px] h-[720px] bg-transparent dark:bg-gray-800 shadow-lg border-t rounded-lg overflow-hidden backdrop-blur-md"
      >
        <article className="flex h-full p-4">
          <section className="w-3/5 h-full relative p-2 pr-8">
            <button
              onClick={toggleForm}
              className="mb-4 px-4 py-2 border border-gray-300 rounded-md shadow-sm bg-gray-200 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
            >
              {showSignIn
                ? "¿No tienes cuenta? Regístrate"
                : "¿Ya tienes cuenta? Inicia sesión"}
            </button>

            {showSignIn ? <SignIn /> : <FormSignUp />}
          </section>
          <section className="w-2/5 h-full relative bg-slate-900 rounded-tr-lg rounded-br-lg">
            <div className="pt-8 px-4 grid justify-center">
              <h1 className="text-white text-4xl font-semibold text-center">
                Welcome to Quickbet Movies!
              </h1>
              <p className="text-white text-base text-center pt-8 px-12">
                🎬 Ready to unlock a universe of cinematic delights? Sign up now
                and start your journey with us!
              </p>
            </div>
            <div className="relative w-[547px] h-[546px]  overflow-hidden">
              <Image
                src={login}
                alt="login"
                layout="fill"
                style={{
                  objectFit: "cover",
                  objectPosition: "center",
                }}
                role="img"
                loading="lazy"
                aria-label="login backdrop"
                className="absolute inset-0"
                placeholder="blur"
              />
            </div>
          </section>
        </article>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarProfile;
