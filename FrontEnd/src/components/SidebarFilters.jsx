import React, { useEffect, useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function SidebarFilter({ onFilterChange }) {
  const [yearRange, setYearRange] = useState([1990, 2025]);
  const [durationRange, setDurationRange] = useState([60, 240]);
  const [genres, setGenres] = useState([]);
  const [selectedGenres, setSelectedGenres] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/movies")
      .then((res) => res.json())
      .then((data) => {
        const genreSet = new Set();
        data.forEach((movie) => {
          try {
            const parsed = JSON.parse(movie.genre.replace(/'/g, '"'));
            parsed.forEach((g) => genreSet.add(g));
          } catch {}
        });
        setGenres([...genreSet]);
      });
  }, []);

  useEffect(() => {
    onFilterChange({ yearRange, durationRange, genreFilter: selectedGenres });
  }, [yearRange, durationRange, selectedGenres]);

  return (
    <div className="space-y-4 p-4 bg-white rounded shadow">
      <div>
        <label className="block font-semibold">Year Range:</label>
        <Slider
          range
          min={1980}
          max={2025}
          defaultValue={yearRange}
          onChange={setYearRange}
        />
        <p>{yearRange[0]} - {yearRange[1]}</p>
      </div>

      <div>
        <label className="block font-semibold">Duration (min):</label>
        <Slider
          range
          min={30}
          max={300}
          defaultValue={durationRange}
          onChange={setDurationRange}
        />
        <p>{durationRange[0]} - {durationRange[1]} min</p>
      </div>

      <div>
        <label className="block font-semibold">Genres:</label>
        <div className="flex flex-col gap-1 max-h-48 overflow-y-auto">
          {genres.map((genre) => (
            <label key={genre} className="text-sm whitespace-nowrap">
              <input
                type="checkbox"
                className="mr-1"
                value={genre}
                checked={selectedGenres.includes(genre)}
                onChange={(e) => {
                  const val = e.target.value;
                  setSelectedGenres((prev) =>
                    prev.includes(val) ? prev.filter((g) => g !== val) : [...prev, val]
                  );
                }}
              />
              {genre}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}