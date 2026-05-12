const express = require('express');
const UserSnippet = require('../models/UserSnippet');
const auth = require('../middleware/auth');
const router = express.Router();

router.get('/', auth, async (req, res) => {
  try {
    const snippets = await UserSnippet.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(snippets);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/', auth, async (req, res) => {
  try {
    const { title, language, code, description, tags } = req.body;
    const snippet = new UserSnippet({ userId: req.user.id, title, language, code, description, tags });
    await snippet.save();
    res.status(201).json(snippet);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

router.delete('/:id', auth, async (req, res) => {
  try {
    const snippet = await UserSnippet.findOneAndDelete({ _id: req.params.id, userId: req.user.id });
    if (!snippet) return res.status(404).json({ message: 'Snippet not found' });
    res.json({ message: 'Snippet deleted' });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
