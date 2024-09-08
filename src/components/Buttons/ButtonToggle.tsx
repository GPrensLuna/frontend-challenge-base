"use client";
import { FC, memo, ReactNode, useCallback } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface MenuItemProps {
  onClick: () => void;
  children: ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = memo(function menuItem({
  onClick,
  children,
}) {
  return (
    <DropdownMenuItem
      onClick={onClick}
      className="px-4 py-2 hover:bg-lightBackground dark:hover:bg-darkBackground cursor-pointer"
    >
      {children}
    </DropdownMenuItem>
  );
});

const ButtonToggle: FC<{ className?: string }> = ({ className }) => {
  const { setTheme } = useTheme();

  const handleLightTheme = useCallback(() => setTheme("light"), [setTheme]);
  const handleDarkTheme = useCallback(() => setTheme("dark"), [setTheme]);
  const handleSystemTheme = useCallback(() => setTheme("system"), [setTheme]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" className={className}>
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0 text-lightText " />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 text-darkText" />
          <span className="sr-only">Toggle theme</span>
          <span className="sr-only">Temas</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="center">
        <MenuItem onClick={handleLightTheme}>Claro</MenuItem>
        <MenuItem onClick={handleDarkTheme}>Oscuro</MenuItem>
        <MenuItem onClick={handleSystemTheme}>Por Defecto</MenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default memo(ButtonToggle);
