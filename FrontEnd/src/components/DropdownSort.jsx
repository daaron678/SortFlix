import React from "react";

export default function DropdownSort({ sortBy, setSortBy }) {
  return (
    <div>
      <label className="block font-semibold">Sort by:</label>
      <select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        className="w-full border rounded p-1 mt-1"
      >
        <option value="combinedScore">Combined score</option>
        <option value="imdb_score">IMDb score</option>
        <option value="rt_score"> Rotten Tomatoes score</option>
        <option value="year">Release year</option>
      </select>
    </div>
  );
}