/* eslint-disable @typescript-eslint/naming-convention */
import Image from "next/image";
import Link from "next/link";

const UnderConstruction = (): JSX.Element => {
  return (
    <div className="min-h-auto flex flex-col items-center justify-center rounded-lg border-[#FF6600] bg-gray-100 dark:bg-gray-900 p-4">
      <article className="text-center">
        <section className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 mx-auto text-[#FF6600] dark:text-[#F79950]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        </section>
        <h1 className="text-3xl md:text-5xl font-bold text-[#FF6600] dark:text-[#F79950]">
          ¡Oops! Página en Construcción 🚧
        </h1>
        <p className="mt-2 text-sm md:text-base text-gray-700 dark:text-gray-400">
          Estamos ocupados construyendo algo increíble. ¡Vuelve pronto para ver
          lo que estamos haciendo!
        </p>
        <section className="mt-6">
          <Link
            href="/"
            className="inline-block px-6 py-3 text-white bg-[#FF6600] rounded-full shadow-lg hover:bg-[#F79950] focus:outline-none focus:ring-2 focus:ring-[#F79950] transition-all"
          >
            Regresar al Inicio
          </Link>
        </section>
        <section className="mt-6 flex flex-col justify-center  items-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Mientras tanto, disfruta de este GIF de construcción:
          </p>
          <article
            className={`w-full h-44 sm:h-52 md:h-72 xl:h-80 relative bg-black overflow-hidden `}
          >
            <section className="relative w-full h-full">
              <Image
                src="https://media.giphy.com/media/xT0xeJpnrWC4LQf3tW/giphy.gif"
                alt="Construcción"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                role="img"
                aria-label="Construction"
                placeholder="blur"
                blurDataURL="https://media.giphy.com/media/xT0xeJpnrWC4LQf3tW/giphy.gif"
                quality={75}
                loading="lazy"
                className="mt-4 rounded-lg shadow-lg"
              />
            </section>
          </article>
        </section>
      </article>
    </div>
  );
};

export default UnderConstruction;
