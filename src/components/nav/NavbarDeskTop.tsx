/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { NavbarMobileProps } from "./TypeScript";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FC, memo, useMemo, useState } from "react";

const dropdownClasses =
  "absolute top-full left-0 py-1 min-w-40 rounded-md border";
const darkDropdownClasses = "bg-gray-800 border-gray-700 shadow-lg";
const lightDropdownClasses = "bg-white border-gray-200 shadow-lg";

const NavbarDeskTop: FC<NavbarMobileProps> = ({ menuNav }) => {
  const pathname = usePathname();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);

  const linkClassesMap = useMemo(() => {
    return menuNav.reduce<Record<string, string>>((acc, nav) => {
      acc[nav.id] = ``;
      return acc;
    }, {});
  }, [menuNav, pathname]);

  return (
    <nav className="hidden xl:flex xl:gap-10 text-xs justify-center h-full items-center relative">
      {menuNav.map((nav) => (
        <button
          key={nav.id}
          className="relative"
          onMouseEnter={() => setOpenMenuId(nav.id)}
          onMouseLeave={() => setOpenMenuId(null)}
        >
          {nav.href ? (
            <Link
              href={nav.href}
              className={linkClassesMap[nav.id]}
              prefetch={true}
              role="menuitem"
              aria-haspopup={nav.option ? "true" : "false"}
              aria-expanded={openMenuId === nav.id}
            >
              {nav.label.toUpperCase()}
            </Link>
          ) : (
            <button
              className={linkClassesMap[nav.id]}
              onClick={() =>
                setOpenMenuId(openMenuId === nav.id ? null : nav.id)
              }
              aria-haspopup="true"
              aria-expanded={openMenuId === nav.id}
            >
              {nav.label.toUpperCase()}
            </button>
          )}
          {nav.option && openMenuId === nav.id && (
            <div
              className={`${dropdownClasses} dark:${darkDropdownClasses} ${!document.documentElement.classList.contains("dark") ? lightDropdownClasses : ""} p-2 py-4 flex flex-col gap-3 rounded-xl`}
              role="menu"
            >
              {nav.option.map((subNav) => (
                <Link
                  key={subNav.id}
                  href={subNav.href || "#"}
                  className={`block p-2 filter drop-shadow-lg rounded-md transition duration-300 ease-in-out font-semibold text-xs ${document.documentElement.classList.contains("dark") ? "text-white hover:bg-amber-600" : "text-gray-900 hover:bg-amber-200"}`}
                  role="menuitem"
                  aria-haspopup="false"
                  aria-expanded="false"
                >
                  {subNav.label}
                </Link>
              ))}
            </div>
          )}
        </button>
      ))}
    </nav>
  );
};

export default memo(NavbarDeskTop);
