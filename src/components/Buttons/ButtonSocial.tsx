/* eslint-disable @typescript-eslint/naming-convention */
import Link from "next/link";
import { Facebook, Instagram } from "lucide-react";
import { Suspense } from "react";

interface Social {
  id: string;
  title: string;
  href: string;
  color: string;
  icon: JSX.Element;
}

const menuSelectActions: Social[] = [
  {
    id: "1",
    title: "Instagram",
    href: "https://www.instagram.com/casadelninomonteria/",
    color: "bg-pink-600 dark:bg-pink-200 hover:bg-pink-500",
    icon: <Instagram className="w-6 h-6" />,
  },
  {
    id: "2",
    title: "Facebook",
    href: "https://www.facebook.com/casadelninomonteria",
    color: "bg-blue-700 dark:bg-blue-200 hover:bg-blue-500",
    icon: <Facebook className="w-6 h-6" />,
  },
];

const ButtonSocial: React.FC = () => {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <article className="flex gap-8">
        {menuSelectActions.map((item) => (
          <Link
            key={item.id}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={`${item.color} text-white dark:text-black flex items-center px-4 py-2 rounded-full text-xs shadow-md hover:opacity-80 transition-opacity duration-300`}
            aria-label={`Visit our ${item.title} profile`}
          >
            <span className="flex items-center space-x-2">
              {item.icon}
              <span className="hidden sm:flex">{item.title}</span>
            </span>
          </Link>
        ))}
      </article>
    </Suspense>
  );
};

export default ButtonSocial;
