"use client";

import { useState, useEffect } from "react";
import { getTranslation } from "../../lib/translations";

export default function TemperatureSlider({
  language,
  onTemperatureChange,
  initialValue = 2,
}) {
  const [temperature, setTemperature] = useState(initialValue);

  const handleSliderChange = (e) => {
    const newTemp = parseFloat(e.target.value);
    setTemperature(newTemp);
    if (onTemperatureChange) {
      onTemperatureChange(newTemp);
    }
  };

  return (
    <div className="temperature-slider-container">
      <input
        type="range"
        min="0.1"
        max="5"
        step="0.1"
        value={temperature}
        onChange={handleSliderChange}
        className="temperature-slider"
      />
      <label className="temperature-label">
        {getTranslation(language, "temperature")}: {temperature.toFixed(1)}
      </label>
    </div>
  );
}
