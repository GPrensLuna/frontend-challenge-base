/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { useState, useEffect } from "react";

interface Profile {
  id?: string;
  email?: string;
  username?: string;
}

export const useProfile = (): {
  profile: Profile;
  message: string;
  isAuthenticated: boolean;
} => {
  const [profile, setProfile] = useState<Profile>({});
  const [message, setMessage] = useState<string>("");
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
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
          return;
        }

        const data: Profile = await response.json();

        if (typeof data === "object" && data !== null) {
          setProfile(data);
        } else {
          setMessage("Datos del perfil inválidos");
        }

        setMessage("Perfil recuperado con éxito");
        setIsAuthenticated(true);
      } catch {
        setMessage("Error al recuperar el perfil");
        setIsAuthenticated(false);
      }
    };

    fetchProfile();
  }, []);

  return { profile, message, isAuthenticated };
};
