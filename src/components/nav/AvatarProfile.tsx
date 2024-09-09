/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { Avatar } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import Image from "next/image";
import LogOutButton from "@/components/Buttons/LogOutButton";
import { FC } from "react";
import UserOffSVG from "./svg/UserOffSVG";

interface AvatarProfileProps {
  image?: string | null;
  name?: string;
}

const AvatarProfile: FC<AvatarProfileProps> = ({ image, name }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <article className="relative">
          <Avatar>
            {image ? (
              <Image
                src={image}
                alt="User Avatar"
                loading="eager"
                role="img"
                width={32}
                height={32}
              />
            ) : (
              <span className="justify-center items-center flex h-full w-full ">
                <UserOffSVG />
              </span>
            )}
          </Avatar>
        </article>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="absolute -right-5 top-3 w-52 px-2 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
      >
        <section className="px-2 py-2 text-center text-gray-900 bg-[#d1bf1c] uppercase lg:text-base  rounded-xl ">
          {name}
        </section>
        <LogOutButton className="block p-2 w-full rounded-md content-center transition duration-300 ease-in-out hover:bg-red-500 text-center uppercase font-bold" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AvatarProfile;
