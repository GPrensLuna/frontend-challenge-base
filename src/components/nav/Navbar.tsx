/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { FC, memo } from "react";
import { SkeletonButton } from "./Skeleton/SkeletonButton";
import { MenuNavBar } from "./TypeScript";
import dynamic from "next/dynamic";
import { useProfile } from "./hook/useProfile";

const NavbarDeskTop = dynamic(() => import("@/components/nav/NavbarDeskTop"), {
  loading: () => <p>Cargando menú...</p>,
  ssr: false,
});
const NavBarMobile = dynamic(() => import("@/components/nav/NavBarMobile"), {
  loading: () => <p>Cargando menú...</p>,
  ssr: false,
});
const AvatarProfile = dynamic(() => import("./AvatarProfile"), {
  loading: () => <SkeletonButton />,
  ssr: false,
});
const ButtonToggle = dynamic(() => import("../Buttons/ButtonToggle"), {
  loading: () => <SkeletonButton />,
  ssr: false,
});
const LogOutButton = dynamic(() => import("../Buttons/LogOutButton"), {
  loading: () => <SkeletonButton />,
  ssr: false,
});

const Navbar: FC = () => {
  const { isAuthenticated } = useProfile();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-md transition-shadow duration-300 w-full ease-in-out bg-lightNavBar dark:bg-darkNavBar h-[69px] bg-black">
      <div className="mx-auto flex items-center w-full h-[69px] px-[100px] py-0 gap-[42px] opacity-1">
        <NavbarDeskTop menuNav={MenuNavBar} />
        <NavBarMobile menuNav={MenuNavBar} />
        <section className="flex items-end justify-end space-x-4 w-full">
          {isAuthenticated && <LogOutButton />}
          <ButtonToggle
            className={`bg-transparent border-2 shadow-xl rounded-full w-8 h-8 lightButton dark:border-darkButton bg-lightBackground dark:bg-darkBackground`}
          />
          <AvatarProfile />
        </section>
      </div>
    </nav>
  );
};

export default memo(Navbar);
