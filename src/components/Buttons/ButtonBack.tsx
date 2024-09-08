"use client";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

interface ButtonBackProps {
  routers: string;
  notRoute: string;
  className?: string;
}

const ButtonBack = ({
  routers,
  notRoute,
  className,
}: ButtonBackProps): JSX.Element | null => {
  const router = useRouter();
  const pathname = usePathname();

  const shouldRenderButtonBack = pathname !== notRoute;

  if (!shouldRenderButtonBack) return null;

  return (
    <Button
      variant={"ghost"}
      onClick={() => router.push(routers)}
      className={`absolute top-20 hover:bg-red-500 bg-red-200 text-[#737373] hover:text-white font-semibold left-30 uppercase  ${className}`}
    >
      {" "}
      <MoveLeft /> Atrás
    </Button>
  );
};

export default ButtonBack;
