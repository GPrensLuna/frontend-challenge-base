/* eslint-disable @typescript-eslint/naming-convention */
"use client";

import Link from "next/link";
import { useState, FC, memo, useCallback } from "react";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { NavbarMobileProps } from "./TypeScript";

const NavbarMobile: FC<NavbarMobileProps> = ({ menuNav }) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => {
      document.body.classList.toggle("overflow-hidden", !prev);
      return !prev;
    });
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    document.body.classList.remove("overflow-hidden");
  }, []);

  const getLinkClasses = `block py-2 px-4 rounded-md transition duration-300 ease-in-out text-lg font-semibold`;

  return (
    <nav className="sticky z-50 xl:hidden w-full">
      <Button
        aria-label="Toggle menu"
        className={`absolute -top-6 left-4 p-1 rounded-xl`}
        onClick={toggleMenu}
      >
        <svg
          className="h-10 w-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 6h16M4 12h16m-7 6h7"
          />
        </svg>
      </Button>

      {isOpen && (
        <article
          className="fixed inset-0 flex bg-black bg-opacity-50 z-50"
          onClick={closeMenu}
        >
          <section
            className={`w-full max-w-xs p-4 shadow-md rounded-md flex flex-col gap-5`}
          >
            <Button onClick={closeMenu} className={`self-end `}>
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>

            <ul className="flex flex-col gap-5 w-full text-center">
              {menuNav.map((nav) => (
                <li key={nav.id}>
                  <Link
                    href={nav.href || "#"}
                    onClick={closeMenu}
                    className={`${pathname === nav.href && getLinkClasses}`}
                    prefetch={true}
                  >
                    {nav.label.toUpperCase()}
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        </article>
      )}
    </nav>
  );
};

export default memo(NavbarMobile);
