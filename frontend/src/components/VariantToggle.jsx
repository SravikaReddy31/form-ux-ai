import React, { useState } from "react";
import FormBaseline from "./formbaseline";
import FormImproved from "./formimproved";

/**
 * Toggle between the baseline and AI-improved forms.
 */
export default function VariantToggle() {
  const [showImproved, setShowImproved] = useState(true);

  const toggle = () => setShowImproved((prev) => !prev);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <h3>
          Viewing: {showImproved ? "AI-Improved Form (B)" : "Baseline Form (A)"}
        </h3>
        <button
          type="button"
          onClick={toggle}
          style={{
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          Switch Form
        </button>
      </div>

      {showImproved ? <FormImproved /> : <FormBaseline />}
    </div>
  );
}
