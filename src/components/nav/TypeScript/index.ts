type Role = "auth" | "dev" | "admin" | "user" | "client";

export interface MenuItem {
  id: string;
  href: string;
  label: string;
  name: string;
  role: Role;
  option?: MenuItem[];
}
export interface NavbarMobileProps {
  menuNav: Array<{
    id: string;
    href: string;
    label: string;
    option?: Array<{
      id: string;
      href?: string;
      label: string;
    }>;
  }>;
}
export type MenuNavBarType = MenuItem[];

export const MenuNavBar: MenuNavBarType = [
  {
    id: "/",
    href: "/",
    label: "Inicio",
    name: "Inicio",
    role: "user",
  },
  {
    id: "Popular",
    href: "/Popular",
    label: "Popular",
    name: "Popular",
    role: "user",
  },
  {
    id: "Favorites",
    href: "/Favorites",
    label: "Favorites",
    name: "Favorites",
    role: "user",
  },
] as MenuNavBarType;
