"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import brownian from "../sketches/brownian";
import { getTranslation } from "../lib/translations";
import LanguageSwitcher from "./components/LanguageSwitcher";
import TemperatureSlider from "./components/TemperatureSlider";

// Dynamically import P5Wrapper (SSR off)
const P5Wrapper = dynamic(() => import("./components/P5Wrapper"), {
  ssr: false,
});

export default function Home() {
  const [language, setLanguage] = useState("de");
  const [temperature, setTemperature] = useState(2);

  const handleLanguageChange = (newLanguage) => {
    setLanguage(newLanguage);
  };

  const handleTemperatureChange = (newTemperature) => {
    setTemperature(newTemperature);
  };

  return (
    <div className="relative min-h-screen">
      <LanguageSwitcher
        currentLanguage={language}
        onLanguageChange={handleLanguageChange}
      />

      <div className="flex flex-col items-center px-8 py-12 text-center">
        <h1 className="text-4xl font-bold mb-4">
          {getTranslation(language, "title")}
        </h1>
        <div className="parent">
          <P5Wrapper
            sketch={brownian}
            language={language}
            temperature={temperature}
          />
        </div>

        <TemperatureSlider
          language={language}
          onTemperatureChange={handleTemperatureChange}
          initialValue={temperature}
        />

        <p className="mt-12 text-lg">
          <b>{getTranslation(language, "instructions.line1")}</b>
          <br />
          {getTranslation(language, "instructions.line2")}
        </p>
      </div>
    </div>
  );
}
