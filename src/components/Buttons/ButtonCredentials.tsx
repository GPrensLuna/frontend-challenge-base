"use client";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";

interface ButtonSocialProps {
  children: React.ReactNode;
  provider: string;
  className: string;
}

const ButtonCredentials = ({
  children,
  provider,
  className,
}: ButtonSocialProps): JSX.Element => {
  const handleClick = async (): Promise<void> => {
    await signIn(provider);
  };

  return (
    <Button
      variant="outline"
      className={`w-full ${className}}`}
      onClick={handleClick}
    >
      {children}
    </Button>
  );
};

export default ButtonCredentials;
