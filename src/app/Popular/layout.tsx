import dynamic from "next/dynamic";

/* eslint-disable @typescript-eslint/naming-convention */
const AsideHome = dynamic(() => import("@/page/Home/Aside"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <section className="flex flex-1 h-auto pt-[70px]">
      <aside className="w-1/4 bg-gray-200 dark:bg-gray-800 p-4 h-screen">
        <AsideHome />
      </aside>
      <main className="flex-1 bg-gray-50 dark:bg-gray-900  w-4/5">
        {children}
      </main>
    </section>
  );
}
