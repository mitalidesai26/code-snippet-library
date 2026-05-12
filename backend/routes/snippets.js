const express = require('express');
const router = express.Router();

const snippets = require('../data/snippets.json');

router.get('/', (req, res) => {
  const { language } = req.query;
  if (language) {
    const filtered = snippets.filter(s => s.language.toLowerCase() === language.toLowerCase());
    return res.json(filtered);
  }
  res.json(snippets);
});

router.get('/languages', (req, res) => {
  const languages = [...new Set(snippets.map(s => s.language))];
  res.json(languages);
});

router.get('/dashboard', (req, res) => {
  const advanced = snippets.filter(s => s.level === 'advanced');
  res.json(advanced);
});

router.get('/:id', (req, res) => {
  const snippet = snippets.find(s => s.id === parseInt(req.params.id));
  if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
  res.json(snippet);
});

module.exports = router;
