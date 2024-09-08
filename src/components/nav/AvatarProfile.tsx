/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { Avatar } from "../ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { usePathname } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import LogOutButton from "@/components/Buttons/LogOutButton";
import { MenuProfile } from "./TypeScript";
import { FC } from "react";

interface AvatarProfileProps {
  image?: string | null;
  name?: string;
}

const AvatarProfile: FC<AvatarProfileProps> = ({ image, name }) => {
  const pathname = usePathname();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <article className="relative">
          <Avatar>
            <Image
              src={image ?? "/user.svg"}
              alt="User Avatar"
              loading="eager"
              role="img"
              width={50}
              height={50}
            />
          </Avatar>
        </article>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="center"
        className="absolute -right-5 top-3 w-52 px-2 py-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg"
      >
        <section className="px-2 py-2 text-center text-gray-900 bg-[#ff862a] uppercase lg:text-base  rounded-xl ">
          {name}
        </section>
        {MenuProfile.map((nav) => (
          <Link
            key={nav.id}
            href={nav.href || "#"}
            role="link"
            className={`block px-2 py-2 rounded-md transition duration-300 ease-in-out my-1 hover:bg-gray-200 hover:text-black text-center uppercase ${
              pathname === nav.href ? "bg-gray-200 text-black" : ""
            }`}
          >
            {nav.label}
          </Link>
        ))}
        <LogOutButton className="block p-2 w-full rounded-md content-center transition duration-300 ease-in-out hover:bg-red-500 text-center uppercase font-bold" />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default AvatarProfile;
