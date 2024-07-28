const express = require("express");
const Store = require("../models/Store");
const auth = require("../middleware/auth");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  const { name, address } = req.body;
  try {
    const newStore = new Store({
      name,
      address,
      owner: req.user.id,
    });

    const store = await newStore.save();
    res.json(store);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/", async (req, res) => {
  try {
    const stores = await Store.find();
    res.json(stores);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.get("/:id", async (req, res) => {
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ msg: "Store not found" });
    }
    res.json(store);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.put("/:id/rate", auth, async (req, res) => {
  const { rating } = req.body;
  try {
    const store = await Store.findById(req.params.id);
    if (!store) {
      return res.status(404).json({ msg: "Store not found" });
    }
    const existingRating = store.ratings.find(
      (r) => r.user.toString() === req.user.id
    );
    if (existingRating) {
      existingRating.rating = rating;
    } else {
      store.ratings.push({ user: req.user.id, rating });
    }
    store.rating =
      store.ratings.reduce((acc, r) => acc + r.rating, 0) /
      store.ratings.length;
    await store.save();
    res.json(store);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
