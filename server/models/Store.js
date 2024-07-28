const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storeSchema = new Schema({
  name: { type: String, required: true, maxlength: 60, minlength: 20 },
  email: { type: String, required: true, unique: true, match: /.+\@.+\..+/ },
  address: { type: String, required: true, maxlength: 400 },
  rating: { type: Number, default: 0 }
});

module.exports = mongoose.model('Store', storeSchema);
