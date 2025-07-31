import React from "react";

export default function SortAlgorithmSelector({ algorithm, setAlgorithm }) {
  return (
    <div>
      <label className="block font-semibold">Sort algorithm:</label>
      <select
        value={algorithm}
        onChange={e => setAlgorithm(e.target.value)}
        className={`w-full border rounded p-1 mt-1 ${
          algorithm === "quick" ? "bg-blue-100" : "bg-green-100"
        }`}
      >
        <option value="quick">QuickSort</option>
        <option value="merge">MergeSort</option>
      </select>
    </div>
  );
}