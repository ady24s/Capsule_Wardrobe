const express = require('express');
const multer = require('multer');
const mongoose = require('mongoose');
const ClothingItem = require('../models/ClothingItem');

const router = express.Router();

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directory to store images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Route to add a clothing item
router.post('/add', upload.fields([
  { name: 'topImage', maxCount: 1 },
  { name: 'bottomImage', maxCount: 1 },
  { name: 'shoesImage', maxCount: 1 },
]), async (req, res) => {
  const { top, bottom, shoes } = req.body;
  const topImage = req.files['topImage'] ? req.files['topImage'][0].path : null;
  const bottomImage = req.files['bottomImage'] ? req.files['bottomImage'][0].path : null;
  const shoesImage = req.files['shoesImage'] ? req.files['shoesImage'][0].path : null;

  try {
    const clothingItem = new ClothingItem({
      top: { ...JSON.parse(top), image: topImage },
      bottom: { ...JSON.parse(bottom), image: bottomImage },
      shoes: { image: shoesImage },
    });

    await clothingItem.save();
    res.status(201).json({ message: 'Clothing item added successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong', error: error.message });
  }
});

module.exports = router;
