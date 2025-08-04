import React from "react";
import MovieCard from "./MovieCard";

export default function MovieGrid({ movies, loading }) {
  if (loading) return (
    <div className="text-center p-8">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
      <p>Loading movies</p>
    </div>
  );

  if (movies.length === 0) return (
    <div className="text-center p-8 rounded-lg">
      <p className="text-xl font-medium text-700">No movies found</p>
    </div>
  );

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  );
}
