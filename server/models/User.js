const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: { type: String, required: true, maxlength: 60, minlength: 20 },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  password: { type: String, required: true, minlength: 8 },
  address: { type: String, required: true, maxlength: 400 },
  role: { type: String, enum: ['Admin', 'NormalUser', 'StoreOwner'], required: true }
});

module.exports = mongoose.model('User', userSchema);
