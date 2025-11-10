// frontend/src/services/api.js
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:4000';

async function submit({ variant, payload }) {
  try {
    const resp = await axios.post(`${API_BASE}/api/submit`, { variant, payload });
    return { ok: true, ...resp.data };
  } catch (err) {
    if (err.response && err.response.data) return { ok: false, ...err.response.data };
    return { ok: false, errors: { _global: 'Network error' } };
  }
}

export default { submit };
