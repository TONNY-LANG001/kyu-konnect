export default function FloatingToggle({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        position: "fixed",
        bottom: "2rem",
        right: "2rem",
        padding: "1rem 2rem",
        borderRadius: "999px",
        background: "linear-gradient(90deg, #ffd700 60%, #ff8c00 100%)",
        boxShadow: "0 0 24px 8px #ffd70080",
        border: "none",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "1.4rem",
        color: "#222"
      }}
    >
      ➡️
    </button>
  );
}
