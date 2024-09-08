/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import ButtonToggle from "../Buttons/ButtonToggle";
import dynamic from "next/dynamic";
import { FC, memo } from "react";
import ButtonSocial from "../Buttons/ButtonSocial";
import AvatarProfile from "./AvatarProfile";
import { useAuthMenu } from "./hook/sessionHook";

const NavbarDeskTop = dynamic(() => import("@/components/nav/NavbarDeskTop"), {
  loading: () => <p>Cargando menú...</p>,
  ssr: true,
});
const NavBarMobile = dynamic(() => import("@/components/nav/NavBarMobile"), {
  loading: () => <p>Cargando menú...</p>,
  ssr: true,
});

const Navbar: FC = () => {
  const { menuNavRole, session } = useAuthMenu();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 shadow-md transition-shadow duration-300 w-full ease-in-out rounded bg-lightNavBar dark:bg-darkNavBar h-16">
      <div className="max-w-screen-xl min-w-96 mx-auto px-4 py-3 flex items-center justify-between">
        <NavbarDeskTop menuNav={menuNavRole} />
        <NavBarMobile menuNav={menuNavRole} />
        <section className="flex items-end space-x-4">
          <ButtonSocial />
          <ButtonToggle
            className={`bg-transparent border-2  shadow-xl rounded-full w-10 h-10 lightButton dark:border-darkButton bg-lightBackground dark:bg-darkBackground`}
          />
          {!!session && (
            <AvatarProfile
              image={session?.user?.image ?? ""}
              name={session?.user?.name ?? ""}
            />
          )}
        </section>
      </div>
    </nav>
  );
};

export default memo(Navbar);
