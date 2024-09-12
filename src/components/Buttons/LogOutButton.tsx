/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

const LogOutButton = ({ className }: { className?: string }): JSX.Element => {
  const router = useRouter();

  const handleClick = async (): Promise<void> => {
    try {
      const response = await fetch(`/api/auth/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Logout failed");
      }

      router.push("/");
      window.location.reload();
    } catch {
      throw new Error("Logout failed");
    }
  };

  return (
    <Button className={className} variant={"destructive"} onClick={handleClick}>
      Cerrar sesión
    </Button>
  );
};

export default LogOutButton;
