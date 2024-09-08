/* eslint-disable @typescript-eslint/naming-convention */
import Image from "next/image";
import Link from "next/link";

interface ErrorComponentProps {
  message: string;
  redirectPath?: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message,
  redirectPath = "/",
}) => {
  return (
    <div className="min-h-auto flex flex-col items-center justify-center rounded-lg border-red-500 bg-gray-100 dark:bg-gray-900 p-4">
      <article className="text-center">
        <section className="mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-20 h-20 mx-auto text-red-500 dark:text-red-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 8v4m0 4h.01M4.293 4.293a1 1 0 011.414 0L12 9.586l6.293-6.293a1 1 0 111.414 1.414L13.414 12l6.293 6.293a1 1 0 01-1.414 1.414L12 13.414l-6.293 6.293a1 1 0 01-1.414-1.414L10.586 12 4.293 5.707a1 1 0 010-1.414z"
            />
          </svg>
        </section>
        <h1 className="text-3xl md:text-5xl font-bold text-red-500 dark:text-red-400">
          ¡Ups! Algo salió mal 🚨
        </h1>
        <p className="mt-4 text-lg md:text-xl font-semibold text-red-700 dark:text-red-300 bg-red-100 dark:bg-red-800 p-4 rounded-lg shadow-md">
          {message}
        </p>
        <section className="mt-6">
          <Link
            href={redirectPath}
            className="inline-block px-6 py-3 text-white bg-red-500 rounded-full shadow-lg hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all"
          >
            Regresar
          </Link>
        </section>
        <section className="mt-6 flex flex-col justify-center items-center">
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Mientras tanto, aquí hay algo para alegrar tu día:
          </p>
          <article
            className={`w-full h-44 sm:h-52 md:h-72 xl:h-80 relative bg-black overflow-hidden  `}
          >
            <section className="relative w-full h-full">
              <Image
                src="https://media.giphy.com/media/xT0xeJpnrWC4LQf3tW/giphy.gif"
                alt="Error"
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                style={{ objectFit: "cover" }}
                role="img"
                aria-label="Construction"
                placeholder="blur"
                blurDataURL="https://media.giphy.com/media/xT0xeJpnrWC4LQf3tW/giphy.gif"
                quality={75}
                loading="eager"
                className="mt-4 rounded-lg shadow-lg"
              />
            </section>
          </article>
        </section>
      </article>
    </div>
  );
};

export default ErrorComponent;
