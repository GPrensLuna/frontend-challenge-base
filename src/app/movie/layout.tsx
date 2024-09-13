/* eslint-disable @typescript-eslint/naming-convention */

import Observer from "./Observer";

export default function RootMovie({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): JSX.Element {
  return (
    <article className="flex flex-col h-auto bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <section className="flex flex-1 h-auto">
        <Observer />
        <main className="flex-1 bg-gray-50 dark:bg-gray-900  w-4/5 h-auto">
          {children}
        </main>
      </section>
    </article>
  );
}
