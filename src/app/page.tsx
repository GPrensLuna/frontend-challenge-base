import dynamic from "next/dynamic";

const BannerHome = dynamic(() => import("@/page/Home/Banner"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
const AsideHome = dynamic(() => import("@/page/Home/Aside"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});
const MainHome = dynamic(() => import("@/page/Home/Main"), {
  loading: () => <div>Loading...</div>,
  ssr: false,
});

export default function pageHome(): JSX.Element {
  return (
    <article className="flex flex-col h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <header className="relative z-10">
        <BannerHome />
      </header>
      <section className="flex flex-1 h-auto">
        <aside className="w-1/4 bg-gray-200 dark:bg-gray-800 p-4 h-screen">
          <AsideHome />
        </aside>
        <main className="flex-1 bg-gray-50 dark:bg-gray-900  w-4/5">
          <MainHome />
        </main>
      </section>
    </article>
  );
}
