const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ratingSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  storeId: { type: Schema.Types.ObjectId, ref: 'Store', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }
});

module.exports = mongoose.model('Rating', ratingSchema);
