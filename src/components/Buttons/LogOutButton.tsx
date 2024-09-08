"use client";
import { signOut } from "next-auth/react";
import { Button } from "../ui/button";

const LogOutButton = ({ className }: { className?: string }): JSX.Element => {
  const handleClick = async (): Promise<void> => {
    await signOut({ callbackUrl: "/SignIn" });
  };

  return (
    <Button className={className} variant={"destructive"} onClick={handleClick}>
      Cerrar sesión
    </Button>
  );
};

export default LogOutButton;
