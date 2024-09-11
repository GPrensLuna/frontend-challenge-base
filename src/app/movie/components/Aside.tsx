/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import Select from "react-select";
import { useMemo } from "react";
import { useGenres } from "../hook/useGenres";
import useSearchBar from "../hook/useSearchBar";

const Aside = (): React.JSX.Element => {
  const { genres } = useGenres();
  const { query, genre, handleSearchChange, handleGenreChange } =
    useSearchBar();

  const genreOptions = useMemo(
    () => genres.map((g) => ({ value: g.id, label: g.name })),
    [genres],
  );

  const selectedGenreValues = useMemo(
    () => new Set(genre.split(",").map((value) => Number(value))),
    [genre],
  );

  const selectedGenres = useMemo(
    () =>
      genreOptions.filter((option) => selectedGenreValues.has(option.value)),
    [genreOptions, selectedGenreValues],
  );

  return (
    <aside className="p-4 h-auto">
      <h2 className="text-lg font-semibold">Filter Options</h2>

      <input
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search genres..."
        className="border rounded px-2 py-1 w-full mb-4"
      />

      <Select
        isMulti
        options={genreOptions}
        value={selectedGenres}
        onChange={handleGenreChange}
        className="basic-single mb-4"
        classNamePrefix="select"
      />
    </aside>
  );
};

export default Aside;
