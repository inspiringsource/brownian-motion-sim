export const translations = {
  de: {
    title: "Avi's Brownian Motion Simulator",
    instructions: {
      line1: "Bewege den Temperatur Regler!",
      line2:
        "Die Rahmenfarbe der Box wechselt von Blau (kalt, wenige Kollisionen) zu Rot (heiss, viele Kollisionen).",
    },
    temperature: "Temperatur",
    language: "Sprache",
  },
  en: {
    title: "Avi's Brownian Motion Simulator",
    instructions: {
      line1: "Move the Temperature slider!",
      line2:
        "The frame color of the box changes from blue (cold, few collisions) to red (hot, many collisions).",
    },
    temperature: "Temperature",
    language: "Language",
  },
};

export const getTranslation = (language, key) => {
  const keys = key.split(".");
  let value = translations[language] || translations.de;

  for (const k of keys) {
    value = value[k];
    if (!value) return key; // Return key if translation not found
  }

  return value;
};
