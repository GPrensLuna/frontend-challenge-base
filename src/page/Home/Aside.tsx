/* eslint-disable @typescript-eslint/naming-convention */
"use client";
import React, { useState } from "react";
import Select, { MultiValue } from "react-select";
import { useGenres } from "./hook/useGenres";

interface GenreOption {
  value: number;
  label: string;
}

const Aside = (): React.JSX.Element => {
  const { genres } = useGenres();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState<GenreOption[]>([]);

  const genreOptions = genres.map((genre) => ({
    value: genre.id,
    label: genre.name,
  }));

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleGenreChange = (newValue: MultiValue<GenreOption>): void => {
    setSelectedGenres(newValue as GenreOption[]);
  };

  const filteredGenres = genreOptions.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <aside className="p-4">
      <h2 className="text-lg font-semibold">Filter Options</h2>

      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder="Search genres..."
        className="border rounded px-2 py-1 w-full mb-4"
      />

      <Select
        isMulti
        options={filteredGenres}
        value={selectedGenres}
        onChange={handleGenreChange}
        className="basic-single mb-4"
        classNamePrefix="select"
      />
    </aside>
  );
};

export default Aside;
