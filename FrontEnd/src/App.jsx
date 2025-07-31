import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SidebarFilter from "./components/SidebarFilters";
import DropdownSort from "./components/DropdownSort";
import SortAlgorithmSelector from "./components/SortAlgorithmSelector";
import ScoreWeightSelector from "./components/ScoreWeightSelector";
import MovieGrid from "./components/MovieGrid";
import { quickSort, mergeSort } from "./components/sort";

function App() {
  const [movies, setMovies] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [sortBy, setSortBy] = useState("combinedScore");
  const [sortAlgorithm, setSortAlgorithm] = useState("quick");
  const [weights, setWeights] = useState({ imdb: 0.5, rt: 0.5 });
  const [filters, setFilters] = useState({
    yearRange: [1990, 2025],
    durationRange: [60, 240],
    genreFilter: [],
  });
  const [loading, setLoading] = useState(true);

  // Fetch movies once
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/movies");
      const data = await res.json();
      setMovies(data);
      setLoading(false);
    }
    fetchData();
  }, []);

  // Process filtering + scoring + sorting
  useEffect(() => {
    const { yearRange, durationRange, genreFilter } = filters;

    let filteredData = movies.filter((m) => {
      const year = m.year || m.released_year || 0;
      const duration = m.runtime || 0;

      const matchYear = year >= yearRange[0] && year <= yearRange[1];
      const matchDuration = duration >= durationRange[0] && duration <= durationRange[1];

      let matchGenre = true;
      if (genreFilter.length) {
        try {
          const genres = JSON.parse(m.genre?.replace(/'/g, '"') || "[]");
          matchGenre = genreFilter.some((g) => genres.includes(g));
        } catch {
          matchGenre = false;
        }
      }

      return matchYear && matchDuration && matchGenre;
    });

    // Add combinedScore
    filteredData = filteredData.map((m) => {
      const imdb = Number(m.imdb_score) || 0;
      const rt = Number(m.rt_score) || 0;
      const combined = imdb * weights.imdb + rt * weights.rt;
      return {
        ...m,
        combinedScore: parseFloat(combined.toFixed(2)),
      };
    });

    // Sort
    const sorted =
      sortAlgorithm === "quick"
        ? quickSort(filteredData, sortBy)
        : mergeSort(filteredData, sortBy);

    setFiltered(sorted);
  }, [movies, filters, sortBy, sortAlgorithm, weights]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <div className="flex flex-col md:flex-row">
        <aside className="md:w-1/4 p-4 space-y-4 bg-white shadow-sm">
          <SidebarFilter onFilterChange={setFilters} />
          <DropdownSort sortBy={sortBy} setSortBy={setSortBy} />
          <SortAlgorithmSelector algorithm={sortAlgorithm} setAlgorithm={setSortAlgorithm} />
          <ScoreWeightSelector weights={weights} setWeights={setWeights} />
        </aside>

        <main className="md:w-3/4 p-4">
          <MovieGrid movies={filtered} loading={loading} />
        </main>
      </div>
    </div>
  );
}

export default App;
