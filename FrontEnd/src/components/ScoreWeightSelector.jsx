import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";

export default function ScoreWeightSelector({ weights, setWeights }) {
  const handleChange = (value) => {
    setWeights({
      imdb: parseFloat((value / 100).toFixed(2)),
      rt: parseFloat(((100 - value) / 100).toFixed(2)),
    });
  };

  return (
    <div>
      <label className="block font-semibold mb-2">IMDb vs RT Weight:</label>
      <Slider
        min={0}
        max={100}
        defaultValue={weights.imdb * 100}
        onChange={handleChange}
        railStyle={{ backgroundColor: "#ccc" }}
        trackStyle={{ backgroundColor: "#3b82f6" }}
        handleStyle={{ borderColor: "#3b82f6" }}
      />
      <div className="text-sm mt-2 text-gray-700">
        IMDb: {(weights.imdb * 100).toFixed(0)}% — RT: {(weights.rt * 100).toFixed(0)}%
      </div>
    </div>
  );
}
