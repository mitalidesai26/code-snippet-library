const mongoose = require('mongoose');

const userSnippetSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  title: { type: String, required: true },
  language: { type: String, required: true },
  code: { type: String, required: true },
  description: { type: String, default: '' },
  tags: [String],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('UserSnippet', userSnippetSchema);
