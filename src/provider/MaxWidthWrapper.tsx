import { cn } from "../lib/utils";
import { ReactNode } from "react";

interface Props {
  className?: string;
  children: ReactNode;
}

export const MaxWidthWrapper = ({
  className,
  children,
}: Props): JSX.Element => {
  return (
    <main
      className={cn(
        "h-ful pt-4 pb-7 mx-auto w-full min-w-96 max-w-screen-2xl md:px-10 lg:px-28 px-2",
        className,
      )}
    >
      {children}
    </main>
  );
};
