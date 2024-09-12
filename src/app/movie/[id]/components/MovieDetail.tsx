/* eslint-disable @typescript-eslint/naming-convention */

interface Genre {
  id: number;
  name: string;
}

interface Movie {
  backdrop_path: string;
  title: string;
  vote_average: number;
  overview: string;
  release_date: string;
  budget: number;
  genres: Genre[];
  poster_path: string;
  tagline: string;
  homepage: string;
}

interface MovieDetailProps {
  movie: Movie;
}

const MovieDetail: React.FC<MovieDetailProps> = ({ movie }) => {
  const {
    backdrop_path,
    title,
    vote_average,
    overview,
    release_date,
    budget,
    genres,
    poster_path,
    tagline,
    homepage,
  } = movie;

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(amount);
  };

  return (
    <div className="relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(https://image.tmdb.org/t/p/original${backdrop_path})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>
      </div>

      <div className="relative p-8 flex flex-col md:flex-row items-center">
        <img
          src={`https://image.tmdb.org/t/p/w500${poster_path}`}
          alt={title}
          className="w-64 h-auto md:w-96 rounded-lg shadow-lg"
        />
        <div className="md:ml-8">
          <h1 className="text-3xl font-bold mb-2">{title}</h1>
          <p className="text-lg text-gray-400 mb-4">{tagline}</p>
          <p className="text-xl font-semibold mb-4">
            Rating: {vote_average.toFixed(1)}
          </p>
          <p className="text-lg mb-4">{overview}</p>
          <p className="text-lg mb-2">Release Date: {release_date}</p>
          <p className="text-lg mb-2">Budget: {formatCurrency(budget)}</p>
          <p className="text-lg mb-4">
            Genres: {genres.map((genre: Genre) => genre.name).join(", ")}
          </p>
          <a
            href={homepage}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline"
          >
            Visit Official Website
          </a>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
