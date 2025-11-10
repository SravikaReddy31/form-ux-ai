// frontend/src/App.jsx
import React from "react";
import VariantToggle from "./components/VariantToggle";

export default function App() {
  return (
    <div
      style={{
        maxWidth: "600px",
        margin: "2rem auto",
        fontFamily: "Arial, sans-serif",
        padding: "1rem",
      }}
    >
      <h1 style={{ textAlign: "center", color: "#007bff" }}>
        AI-Assisted Form UX Improvement
      </h1>
      <p style={{ textAlign: "center", color: "#555" }}>
        Compare the baseline vs AI-improved form experience
      </p>
      <VariantToggle />
    </div>
  );
}
