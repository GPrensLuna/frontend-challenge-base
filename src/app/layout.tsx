/* eslint-disable @typescript-eslint/naming-convention */
import ThemeProvider from "@/provider/ThemeProvider";
import { Metadata } from "next";
import { Toaster } from "sonner";
import "./globals.css";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/nav/Navbar"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

export const metadata: Metadata = {
  title: "Movies",
  description: "Pagina para ver películas.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <nav>
            <Navbar />
          </nav>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
