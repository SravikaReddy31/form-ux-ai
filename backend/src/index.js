// backend/src/index.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const submitRoute = require('./routes/submit');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// add somewhere after app.use(bodyParser.json());
app.get('/', (req, res) => {
  res.send('Form-UX-AI backend — use /api/submit or /health');
});


app.use('/api/submit', submitRoute);
app.get('/health', (req, res) => res.json({ ok: true, time: Date.now() }));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
