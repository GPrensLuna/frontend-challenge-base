/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { Button } from "../ui/button";
import { useSession } from "@/provider/SessionProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";

const LogOutButton = ({ className }: { className?: string }): JSX.Element => {
  const { logout } = useSession();
  const router = useRouter();
  const [error, setError] = useState<string>("");

  const handleLogout = (): void => {
    try {
      logout();
      router.push("/");
    } catch {
      setError("No se pudo cerrar sesión. Inténtalo de nuevo.");
    }
  };

  return (
    <div>
      <Button
        className={className}
        variant={"destructive"}
        onClick={handleLogout}
      >
        Cerrar sesión
      </Button>
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default LogOutButton;
