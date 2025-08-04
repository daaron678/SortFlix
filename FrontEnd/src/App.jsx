import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import SidebarFilter from "./components/SidebarFilters";
import DropdownSort from "./components/DropdownSort";
import SortAlgorithmSelector from "./components/SortAlgorithmSelector";
import ScoreWeightSelector from "./components/ScoreWeightSelector";
import MovieGrid from "./components/MovieGrid";
import Pagination from "./components/Pagination";
import { quickSort, mergeSort } from "./components/sort";

function App() {
  // data from backend
  const [movies, setMovies] = useState([]);

  // filtered and sorted data to display
  const [filtered, setFiltered] = useState([]);

  // sorting logic, initalizing to sort by Combined score and Quick sort at first
  const [sortBy, setSortBy] = useState("combinedScore"); // which key to sort by
  const [sortAlgorithm, setSortAlgorithm] = useState("quick"); // quickSort or mergeSort

  // slider for user to decide weights, default to be half each
  const [weights, setWeights] = useState({ imdb: 0.5, rt: 0.5 });

  // filtering values (on side bar filter)
  const [filters, setFilters] = useState({
    yearRange: [1990, 2025],
    durationRange: [60, 240],
    genreFilter: [],
  });

  // set page as loading at first
  const [loading, setLoading] = useState(true);

  // set time to test sorting algorithm performance
  const [sortTime, setSortTime] = useState(null);

  // set movies per page to 30
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 30;

  // fetch movies once from backend
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const res = await fetch("http://localhost:3000/api/movies");
      let data = await res.json();

      // pre-parse genre from JSON to real array, as at first, it is "['Action', 'Drama']", we parse it to a string array ["Action", "Drama"]
      data = data.map((m) => ({
        ...m,
        parsedGenre: (() => {
          try {
            return JSON.parse(m.genre?.replace(/'/g, '"') || "[]");
          } catch {
            return [];
          }
        })(),
      }));

      setMovies(data); // set movies to newly-parsed data
      setLoading(false); // stop loading, page now have array of movies fetched from backend
    }

    fetchData();
  }, []); // end fetching, no dependencies

  // process filtering, scoring, and sorting when input states change
  useEffect(() => {
    const { yearRange, durationRange, genreFilter } = filters;

    let filteredData = movies.filter((m) => {
      const year = m.year || 0;
      const duration = m.runtime || 0;

      // filtering year and duration
      const matchYear = year >= yearRange[0] && year <= yearRange[1];
      const matchDuration = duration >= durationRange[0] && duration <= durationRange[1];

      // filtering genre
      let matchGenre = true;
      if (genreFilter.length) { // if there is any genre selected, then update movies that meet every of the requirements
        matchGenre = genreFilter.every((g) => m.parsedGenre.includes(g));
      }

      return matchYear && matchDuration && matchGenre; // return only movies that match
    }); // end processing, no dependencies

    // compute weighted score for each movie
    filteredData = filteredData.map((m) => {
      const imdb = Number(m.imdb_score) || 0;
      const rt = Number(m.rt_score) || 0;
      const combined = imdb * weights.imdb + rt * weights.rt;
      return {
        ...m,
        combinedScore: parseFloat(combined.toFixed(2)),
      };
    });

    // sort using selected method
    let sorted;
    let time;

    if (sortAlgorithm === "quick") {
      const start = performance.now();
      sorted = quickSort(filteredData, sortBy);
      time = performance.now() - start;
    } else {
      const start = performance.now();
      sorted = mergeSort(filteredData, sortBy);
      time = performance.now() - start;
    }

    setFiltered(sorted);
    setSortTime(time.toFixed(2)); // set time in ms, rounded to 2 digits
    setCurrentPage(1); // return to first page
  }, [movies, filters, sortBy, sortAlgorithm, weights]); // dependencies

  // paginate data
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentMovies = filtered.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filtered.length / itemsPerPage);

  // rendering UI using utility classes of Tailwind CSS
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
          <MovieGrid movies={currentMovies} loading={loading} />
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </main>
      </div>
    </div>
  );
}

export default App;
