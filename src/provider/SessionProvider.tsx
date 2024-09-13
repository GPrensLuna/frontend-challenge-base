/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface ErrorState {
  message: string;
  error: string | null;
  statusCode: number | null;
}

const initialErrorState: ErrorState = {
  message: "",
  error: null,
  statusCode: null,
};

interface Profile {
  id?: string;
  email?: string;
  username?: string;
}

interface SessionContextProps {
  profile: Profile;
  isAuthenticated: boolean;
  errorState: ErrorState;
  fetchProfile: () => void;
  logout: () => void;
}

const SessionContext = createContext<SessionContextProps | undefined>(
  undefined,
);

const SessionProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [profile, setProfile] = useState<Profile>({});
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [errorState, setErrorState] = useState<ErrorState>(initialErrorState);

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
        const errorDetails = await response.json();
        setErrorState({
          message: errorDetails.message || "Error desconocido",
          error: errorDetails.error || null,
          statusCode: response.status || null,
        });
        setIsAuthenticated(false);
        setProfile({});
        return;
      }

      const data: Profile = await response.json();
      if (data.id) {
        setProfile(data);
        setIsAuthenticated(true);
        setErrorState(initialErrorState);
      } else {
        setErrorState({
          message: "Datos del perfil inválidos",
          error: "InvalidProfileData",
          statusCode: null,
        });
        setIsAuthenticated(false);
        setProfile({});
      }
    } catch (error) {
      setErrorState({
        message: "Error al recuperar el perfil",
        error: error instanceof Error ? error.message : "UnknownError",
        statusCode: null,
      });
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
        const errorDetails = await response.json();
        setErrorState({
          message: errorDetails.message || "Error al cerrar sesión",
          error: errorDetails.error || null,
          statusCode: response.status || null,
        });
        return;
      }

      setProfile({});
      setIsAuthenticated(false);
      setErrorState(initialErrorState);
    } catch (error) {
      setErrorState({
        message: "Error al cerrar sesión",
        error: error instanceof Error ? error.message : "UnknownError",
        statusCode: null,
      });
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <SessionContext.Provider
      value={{ profile, isAuthenticated, errorState, fetchProfile, logout }}
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
