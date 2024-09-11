/* eslint-disable @typescript-eslint/naming-convention */
import dynamic from "next/dynamic";

const AsideHome = dynamic(() => import("./components/Aside"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
export default function RootMovie({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <article className="flex flex-col h-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <section className="flex flex-1 h-auto">
        <aside className="w-1/4 bg-gray-200 dark:bg-gray-800 p-4 h-auto">
          <AsideHome />
        </aside>
        <main className="flex-1 bg-gray-50 dark:bg-gray-900  w-4/5 h-auto">
          {children}
        </main>
      </section>
    </article>
  );
}
