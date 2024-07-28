const express = require('express');
const router = express.Router();
const Rating = require('../models/Rating');
const Store = require('../models/Store');
const auth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const ratings = await Rating.find();
    res.json(ratings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
router.post('/', auth, async (req, res) => {
  const { storeId, rating } = req.body;
  const userId = req.user.id;
  try {
    let existingRating = await Rating.findOne({ userId, storeId });
    if (existingRating) {
      existingRating.rating = rating;
      await existingRating.save();
    } else {
      const newRating = new Rating({ userId, storeId, rating });
      await newRating.save();
    }
    const storeRatings = await Rating.find({ storeId });
    const avgRating = storeRatings.reduce((sum, r) => sum + r.rating, 0) / storeRatings.length;
    const store = await Store.findById(storeId);
    store.rating = avgRating;
    await store.save();

    res.json({ msg: 'Rating saved' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
