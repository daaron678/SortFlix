import React from "react";
import MovieCard from "./MovieCard";
import { motion, AnimatePresence } from "framer-motion";

export default function MovieGrid({ movies, loading }) {
  if (loading) return <p className="text-center">Loading movies...</p>;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      <AnimatePresence>
        {movies.length > 0 ? (
          movies.map((movie, idx) => (
            <motion.div
              key={movie.id}
              layout
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <MovieCard movie={movie} />
            </motion.div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-400">No movies found</p>
        )}
      </AnimatePresence>
    </div>
  );
}
