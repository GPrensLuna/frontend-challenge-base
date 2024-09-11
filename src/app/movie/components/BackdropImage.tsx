/* eslint-disable @typescript-eslint/naming-convention */
import React from "react";
import Image from "next/image";

interface BackdropImageProps {
  backdropPath: string;
  title: string;
}

const BackdropImage: React.FC<BackdropImageProps> = ({
  backdropPath,
  title,
}) => {
  return (
    <Image
      src={`https://image.tmdb.org/t/p/w500${backdropPath}`}
      alt={`${title} backdrop`}
      layout="fill"
      style={{
        objectFit: "cover",
        objectPosition: "center",
      }}
      role="img"
      loading="lazy"
      aria-label={`${title} backdrop`}
      className="absolute inset-0 w-full h-60 rounded-lg opacity-50"
      placeholder="blur"
      blurDataURL={`https://image.tmdb.org/t/p/w500${backdropPath}`}
    />
  );
};

export default BackdropImage;
