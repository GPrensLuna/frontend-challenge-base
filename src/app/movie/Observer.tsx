"use client";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const AsideHome = dynamic(() => import("./components/Aside"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
const Observer = (): JSX.Element | undefined => {
  const pathname = usePathname();

  if (pathname === "/movie/populate") {
    return (
      <aside className="w-1/4 bg-gray-200 dark:bg-gray-800 p-4 h-auto">
        <AsideHome />
      </aside>
    );
  }
  return <></>;
};

export default Observer;
