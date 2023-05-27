const PassForm = require('../models/passModel');
const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  data: Buffer,
  contentType: String,
  tag: {
    type: String,
    enum: ['xuor', 'atfmr', 'ass', 'req2borr'],
  },
  pass: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'PassForm',
  },
});

const File = mongoose.model('files', fileSchema);
module.exports = File;
