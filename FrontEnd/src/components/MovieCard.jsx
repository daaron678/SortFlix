import React from "react";

export default function MovieCard({ movie }) {
  const genres = movie.parsedGenre || [];

  return (
    <div className="bg-white rounded shadow p-4">
      <h3 className="text-lg text-black font-bold mb-1">{movie.title}</h3>
      <p className="text-sm text-black text-gray-600">{movie.year}</p>
      <p className="text-sm text-black">Runtime: {movie.runtime} min</p>
      <p className="text-sm text-black">IMDb: {movie.imdb_score ?? "N/A"} | RT: {movie.rt_score ?? "N/A"}</p>
      <p className="text-sm text-black font-semibold">Score: {movie.combinedScore ?? "?"}</p>
      {genres.length > 0 && (
        <p className="text-sm text-blue-600 mt-1">Genres: {genres.join(", ")}</p>
      )}
      <p className="text-sm text-gray-500 mt-2 line-clamp-3">
        {movie.description}
      </p>
    </div>
  );
}
