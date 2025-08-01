import React from "react";

export default function SortAlgorithmSelector({ algorithm, setAlgorithm }) {
  return (
    <div>
      <label className="block font-semibold mb-1">Sorting Algorithm:</label>
      <div className="space-y-1">
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="algorithm"
            value="quick"
            checked={algorithm === "quick"}
            onChange={() => setAlgorithm("quick")}
          />
          <span>Quick Sort</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="algorithm"
            value="merge"
            checked={algorithm === "merge"}
            onChange={() => setAlgorithm("merge")}
          />
          <span>Merge Sort</span>
        </label>
      </div>
    </div>
  );
}
