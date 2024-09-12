/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Profile {
  id?: string;
  email?: string;
  username?: string;
}

interface SessionContextProps {
  profile: Profile;
  message: string;
  isAuthenticated: boolean;
  fetchProfile: () => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined,
);

const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>({});
  const [message, setMessage] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  const fetchProfile = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/auth/profile`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        if (response.status === 401) {
          setMessage("No autorizado. Token inválido o no proporcionado");
        } else {
          setMessage("Error desconocido");
        }
        setIsAuthenticated(false);
        setProfile({});
        return;
      }

      const data: Profile = await response.json();

      if (data && typeof data === "object") {
        setProfile(data);
        setMessage("Perfil recuperado con éxito");
        setIsAuthenticated(true);
      } else {
        setMessage("Datos del perfil inválidos");
        setIsAuthenticated(false);
        setProfile({});
      }
    } catch {
      setMessage("Error al recuperar el perfil");
      setIsAuthenticated(false);
      setProfile({});
    }
  };

  const logout = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (!response.ok) {
        setMessage("Error al cerrar sesión");
        return;
      }

      setProfile({});
      setIsAuthenticated(false);
      setMessage("Has cerrado sesión con éxito");
    } catch {
      setMessage("Error al cerrar sesión");
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <SessionContext.Provider
      value={{ profile, message, isAuthenticated, fetchProfile, logout }}
    >
      {children}
    </SessionContext.Provider>
  );
};

const useSession = (): SessionContextProps => {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession debe ser usado dentro de un SessionProvider");
  }
  return context;
};

export { SessionProvider, useSession };
