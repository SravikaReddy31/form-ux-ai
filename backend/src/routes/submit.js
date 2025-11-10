// backend/src/routes/submit.js
const express = require('express');
const router = express.Router();
const { validateSubmission } = require('../validations');
const { insertSubmission, getMetrics } = require('../db');

router.post('/', (req, res) => {
  const { variant, payload } = req.body || {};
  const errors = validateSubmission(payload || {});
  const ok = Object.keys(errors).length === 0;

  const id = insertSubmission({
    variant: variant || 'unknown',
    payload: payload || {},
    validation_errors: ok ? null : errors,
  });

  if (!ok) return res.status(400).json({ ok: false, errors, id });
  return res.json({ ok: true, id });
});

// optional: GET /api/submit/metrics
router.get('/metrics', (req, res) => {
  try {
    const rows = getMetrics();
    return res.json({ ok: true, metrics: rows });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ ok: false, error: 'Failed to get metrics' });
  }
});

module.exports = router;
