// backend/src/validations.js
const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

function validateSubmission(payload = {}) {
  const errors = {};
  if (!payload.name || String(payload.name).trim().length < 2) {
    errors.name = 'Name required (min 2 chars)';
  }
  if (!payload.email || !emailRegex.test(String(payload.email))) {
    errors.email = 'Invalid email';
  }
  if (!payload.password || String(payload.password).length < 8) {
    errors.password = 'Password must be >= 8 characters';
  }
  if (payload.terms !== true && payload.terms !== 'true') {
    errors.terms = 'You must accept terms';
  }
  return errors;
}

module.exports = { validateSubmission };
