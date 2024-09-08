"use client";
import { useEffect, useState } from "react";
import { Auth } from "@/auth";
import { Session as NextAuthSession } from "next-auth";
import { MenuNavBar, MenuItem } from "../TypeScript";

export interface UseAuthMenuReturn {
  menuNavRole: MenuItem[];
  session: NextAuthSession | null;
}

export const useAuthMenu = (): UseAuthMenuReturn => {
  const [menuNavRole, setMenuNavRole] = useState<MenuItem[]>([]);
  const [session, setSession] = useState<NextAuthSession | null>(null);

  useEffect(() => {
    const fetchAuthData = async (): Promise<void> => {
      try {
        const session = await Auth.auth();
        setSession(session);

        const userRole = session?.user.role;

        const filteredMenu = MenuNavBar.filter(({ role }) => {
          if (userRole === "dev") return role !== "auth";
          if (userRole === "admin") return role !== "auth" && role !== "dev";
          if (userRole === "user")
            return role !== "auth" && role !== "admin" && role !== "dev";
          return role !== "dev" && role !== "admin" && role !== "client";
        });

        setMenuNavRole(filteredMenu);
      } catch (error) {}
    };

    fetchAuthData();
  }, []);

  return { menuNavRole, session };
};
