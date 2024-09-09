/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { NavbarMobileProps } from "./TypeScript";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, memo } from "react";
import LogoSvg from "./svg/LogoSvg";

const NavbarDeskTop: FC<NavbarMobileProps> = ({ menuNav }) => {
  const pathname = usePathname();

  return (
    <>
      <LogoSvg />

      {menuNav.map((nav) => (
        <Link
          key={nav.id}
          href={nav.href}
          className={`text-white hover:border-b-2 hover:border-white ${pathname === nav.href && "border-b-2 border-white"}`}
          prefetch={true}
          role="menuitem"
          aria-haspopup={nav.option ? "true" : "false"}
        >
          {nav.label.toUpperCase()}
        </Link>
      ))}
    </>
  );
};

export default memo(NavbarDeskTop);
