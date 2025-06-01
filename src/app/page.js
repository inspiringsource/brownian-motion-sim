'use client';

import dynamic from "next/dynamic";
import brownian from "../sketches/brownian";

// Dynamically import P5Wrapper (SSR off)
const P5Wrapper = dynamic(() => import("./components/P5Wrapper"), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col items-center px-8 py-12 text-center">
      <h1 className="text-4xl font-bold mb-4">Avi&apos;s Brownian Motion Simulator</h1>
      <P5Wrapper sketch={brownian} />
      <p>
        Bewege den <b>Temperatur</b> Regler unterhalb der Box!<br />
        Die Rahmenfarbe der Box wechselt von Blau (kalt, wenige Kollisionen) zu Rot (heiß, viele Kollisionen).
      </p>
    </div>
  );
}