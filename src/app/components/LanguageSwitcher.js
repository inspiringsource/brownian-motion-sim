"use client";

import { useState } from "react";

export default function LanguageSwitcher({
  currentLanguage,
  onLanguageChange,
}) {
  return (
    <div className="absolute top-4 right-4 z-10">
      <select
        value={currentLanguage}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="px-3 py-1 border border-gray-300 rounded-md bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      >
        <option value="de">🇩🇪 Deutsch</option>
        <option value="en">🇺🇸 English</option>
      </select>
    </div>
  );
}
