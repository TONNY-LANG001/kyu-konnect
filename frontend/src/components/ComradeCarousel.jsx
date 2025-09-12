import { useState } from "react";
import { comrades } from "../comrades";

export default function ComradeCarousel() {
  const [index, setIndex] = useState(0);

  function prev() {
    setIndex((i) => (i === 0 ? comrades.length - 1 : i - 1));
  }
  function next() {
    setIndex((i) => (i === comrades.length - 1 ? 0 : i + 1));
  }

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
      <button onClick={prev}>&larr;</button>
      <div style={{
        boxShadow: "0 8px 24px rgba(0,0,0,0.2)", borderRadius: "1rem", padding: "1rem", background: "#fff", minWidth: "250px"
      }}>
        <img src={comrades[index].image} alt={comrades[index].name} style={{ width: "80px", borderRadius: "50%" }} />
        <h3>{comrades[index].name}</h3>
        <p>{comrades[index].need}</p>
      </div>
      <button onClick={next}>&rarr;</button>
    </div>
  );
}
