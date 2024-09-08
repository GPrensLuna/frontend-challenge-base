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
    href?: string;
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
    id: "Inicio",
    href: "/",
    label: "Inicio",
    name: "Inicio",
    role: "user",
  },
  {
    id: "SignIn",
    href: "/SignIn",
    label: "Inicio de sesión",
    name: "SignIn",
    role: "auth",
  },
  {
    id: "Instructivos",
    href: "/Instructivos",
    label: "Instructivos",
    name: "Instructivos",
    role: "client",
  },
  {
    id: "OptionUser",
    label: "Option User",
    role: "admin",
    href: "/OptionUser",
    option: [
      {
        id: "ListUser",
        href: "/OptionUser/ListUser",
        label: "List User",
        name: "ListUser",
        role: "admin",
      },
      {
        id: "NewUser",
        href: "/OptionUser/NewUser",
        label: "New User",
        name: "NewUser",
        role: "admin",
      },
      {
        id: "EventLog",
        href: "/OptionUser/EventLog",
        label: "Event log User",
        name: "EventLog",
        role: "admin",
      },
    ],
  },
  {
    id: "OptionInstructions",
    label: "Option Instructions",
    href: "/OptionInstructions",
    role: "admin",
    option: [
      {
        id: "ListInstructions",
        href: "/OptionInstructions/ListInstructions",
        label: "List Instructions",
        name: "ListInstructions",
        role: "admin",
      },
      {
        id: "NewInstructions",
        href: "/OptionInstructions/NewInstructions",
        label: "New Instructions",
        name: "NewInstructions",
        role: "admin",
      },
      {
        id: "NewService",
        href: "/OptionInstructions/NewService",
        label: "New Service",
        name: "NewService",
        role: "admin",
      },
      {
        id: "NewVideo",
        href: "/OptionInstructions/NewVideo",
        label: "New Video",
        name: "NewVideo",
        role: "admin",
      },
    ],
  },
] as MenuNavBarType;

export const MenuProfile: MenuNavBarType = [
  {
    id: "profile",
    href: "/Profile",
    label: "profile",
    name: "profile",
    role: "client",
  },
];

export const menuOptionInstructions: MenuNavBarType = [
  {
    id: "ListInstructions",
    href: "/OptionInstructions/ListInstructions",
    label: "List Instructions",
    name: "ListInstructions",
    role: "admin",
  },
  {
    id: "NewInstructions",
    href: "/OptionInstructions/NewInstructions",
    label: "New Instructions",
    name: "NewInstructions",
    role: "admin",
  },
  {
    id: "NewService",
    href: "/OptionInstructions/NewService",
    label: "New Service",
    name: "NewService",
    role: "admin",
  },
  {
    id: "NewVideo",
    href: "/OptionInstructions/NewVideo",
    label: "New Video",
    name: "NewVideo",
    role: "admin",
  },
];

export const menuOptionUser: MenuNavBarType = [
  {
    id: "ListUser",
    href: "/OptionUser/ListUser",
    label: "List User",
    name: "ListUser",
    role: "admin",
  },
  {
    id: "NewUser",
    href: "/OptionUser/NewUser",
    label: "New User",
    name: "NewUser",
    role: "admin",
  },
  {
    id: "EventLog",
    href: "/OptionUser/EventLog",
    label: "Event log User",
    name: "EventLog",
    role: "admin",
  },
];
