import React, { useState } from "react";
import api from "../services/api";

export default function FormBaseline({ variant = "A" }) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await api.submit({ variant, payload: form });
    if (res.ok) setMessage("Submitted successfully!");
    else setMessage(JSON.stringify(res.errors));
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-label="Baseline signup form"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        border: "1px solid #ccc",
        borderRadius: "10px",
        padding: "1rem",
      }}
    >
      <h2>Baseline Form (Variant A)</h2>

      <div>
        <label htmlFor="name">Name:</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
      </div>

      <div>
        <label>
          <input
            name="terms"
            type="checkbox"
            checked={form.terms}
            onChange={handleChange}
          />{" "}
          I agree to the Terms and Conditions
        </label>
      </div>

      <button type="submit">Submit (Baseline)</button>
      {message && <div role="status">{message}</div>}
    </form>
  );
}
