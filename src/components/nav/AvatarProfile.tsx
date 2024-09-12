/* eslint-disable @typescript-eslint/naming-convention */
"use client";

import { useState } from "react";
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
import login2 from "./svg/login2.png";
import { useProfile } from "./hook/useProfile";
import UserOnSVG from "./svg/UserOnSVG";
import SignUp from "@/app/(Auth)/SignUp/page";

const AvatarProfile: React.FC = () => {
  const { isAuthenticated } = useProfile();
  const [activeButton, setActiveButton] = useState<"signUp" | "logIn">(
    "signUp",
  );

  const toggleForm = (button: "signUp" | "logIn"): void => {
    setActiveButton(button);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <article className="relative">
          <Avatar>
            {isAuthenticated ? (
              <span className="flex items-center justify-center h-full w-full">
                <UserOnSVG />
              </span>
            ) : (
              <span className="flex items-center justify-center h-full w-full">
                <UserOffSVG />
              </span>
            )}
          </Avatar>
        </article>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        className="absolute right-0 top-0 w-[90vw] max-w-[1220px] h-[720px] bg-transparent dark:bg-gray-800 shadow-lg border-t rounded-lg overflow-hidden backdrop-blur-md"
      >
        <article className="flex h-full p-4">
          <section className="w-3/5 h-full relative p-2">
            <div className="absolute gap-1 pt-12 w-full">
              <button
                onClick={() => toggleForm("signUp")}
                className={`mb-4 px-4 py-2 rounded-md shadow-sm font-semibold ${
                  activeButton === "signUp"
                    ? "bg-[#F0B90B] text-white"
                    : "bg-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F0B90B]`}
              >
                Sign up
              </button>
              <button
                onClick={() => toggleForm("logIn")}
                className={`mb-4 px-4 py-2 rounded-md shadow-sm font-semibold ${
                  activeButton === "logIn"
                    ? "bg-[#F0B90B] text-white"
                    : "bg-gray-600"
                } focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#F0B90B]`}
              >
                Log in
              </button>
            </div>
            <div className="w-full h-full flex justify-center items-center">
              {activeButton === "logIn" ? <SignIn /> : <SignUp />}
            </div>
          </section>
          <section className="w-2/5 h-full flex flex-col bg-slate-900 rounded-tr-lg rounded-br-lg">
            <div className="pt-8 px-4 grid justify-center overflow-hidden">
              <h1 className="text-white text-4xl font-semibold text-center">
                {activeButton === "logIn"
                  ? "Welcome to Quickbet Movies!"
                  : "¡Welcome back to Quickbet Movies!"}
              </h1>
              <p className="text-white text-base text-center pt-8 px-12 h-auto">
                {activeButton === "logIn"
                  ? "🎬 Ready to unlock a universe of cinematic delights? Register now and start your journey with us!"
                  : "🍿 Ready to dive into the world of unlimited entertainment? Enter your credentials and let the cinematic adventure begin!"}
              </p>
            </div>
            <div className="relative w-[530px] h-[546px] overflow-hidden">
              <Image
                src={activeButton === "logIn" ? login2 : login}
                alt={activeButton === "logIn" ? "login2" : "login"}
                layout="fill"
                objectFit="cover"
                objectPosition="center"
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
