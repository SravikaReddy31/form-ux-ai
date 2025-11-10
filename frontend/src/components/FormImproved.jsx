import React, { useState, useEffect, useRef } from "react";
import ai from "../ai-suggestions.json";
import api from "../services/api";
import Cookies from "js-cookie";

function useVariant() {
  const [variant, setVariant] = useState(() => Cookies.get("ux_variant") || null);

  useEffect(() => {
    if (!variant) {
      const v = Math.random() < 0.5 ? "A" : "B";
      Cookies.set("ux_variant", v, { expires: 7 });
      setVariant(v);
    }
  }, [variant]);

  return variant;
}

export default function FormImproved() {
  const variant = useVariant();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState(null);
  const startRef = useRef(Date.now());

  useEffect(() => {
    startRef.current = Date.now();
  }, []);

  const validate = () => {
    const e = {};
    if (!form.name || form.name.length < (ai.name.validation.minLength || 2))
      e.name = "Enter your full name.";
    const emailPattern = new RegExp(ai.email.validation.pattern);
    if (!form.email || !emailPattern.test(form.email))
      e.email = "Enter a valid email.";
    if (!form.password || form.password.length < ai.password.validation.minLength)
      e.password = "Password too short.";
    if (!form.terms) e.terms = "You must accept the terms.";
    return e;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (ev) => {
    ev.preventDefault();
    const validation = validate();
    setErrors(validation);
    if (Object.keys(validation).length) return;

    const payload = { ...form, timeToCompleteMs: Date.now() - startRef.current };
    const res = await api.submit({
      variant: Cookies.get("ux_variant") || "B",
      payload,
    });

    if (res.ok) {
      setStatus("✅ Submitted successfully!");
      setErrors({});
    } else {
      setStatus("❌ Submission failed");
      setErrors(res.errors || {});
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      aria-labelledby="improved-form-title"
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        border: "1px solid #007bff",
        borderRadius: "10px",
        padding: "1rem",
      }}
    >
      <h2 id="improved-form-title">
        Improved Signup (Variant B) — {variant}
      </h2>

      <div>
        <label htmlFor="name">{ai.name.label}</label>
        <input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          aria-describedby="nameHelp nameError"
          aria-invalid={!!errors.name}
        />
        <div id="nameHelp" role="note">
          {ai.name.hint}
        </div>
        {errors.name && (
          <div id="nameError" role="alert" aria-live="assertive">
            {errors.name}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="email">{ai.email.label}</label>
        <input
          id="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          aria-describedby="emailHelp emailError"
          aria-invalid={!!errors.email}
        />
        <div id="emailHelp" role="note">
          {ai.email.hint}
        </div>
        {errors.email && (
          <div id="emailError" role="alert" aria-live="assertive">
            {errors.email}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="password">{ai.password.label}</label>
        <input
          id="password"
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          aria-describedby="pwdHelp pwdError"
          aria-invalid={!!errors.password}
        />
        <div id="pwdHelp" role="note">
          {ai.password.hint}
        </div>
        {errors.password && (
          <div id="pwdError" role="alert" aria-live="assertive">
            {errors.password}
          </div>
        )}
      </div>

      <div>
        <label htmlFor="terms">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            checked={form.terms}
            onChange={handleChange}
            aria-describedby="termsError"
            aria-invalid={!!errors.terms}
          />{" "}
          {ai.terms.label}
        </label>
        {errors.terms && (
          <div id="termsError" role="alert" aria-live="assertive">
            {errors.terms}
          </div>
        )}
      </div>

      <button type="submit">Submit (Improved)</button>
      {status && <div role="status">{status}</div>}
    </form>
  );
}
