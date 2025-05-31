import dynamic from "next/dynamic";
import brownian from "../sketches/brownian";

// Dynamically import P5Wrapper (SSR off)
const P5Wrapper = dynamic(() => import("./components/P5Wrapper"), { ssr: false });

export default function Home() {
  return (
    <div style={{ textAlign: "center", padding: "2em" }}>
      <h1>Brownian Motion Simulator</h1>
      <P5Wrapper sketch={brownian} />
      <p>
        Move the <b>temperature</b> slider below the box!<br />
        The box border color shifts from blue (cold, few hits) to red (hot, many hits).
      </p>
    </div>
  );
}