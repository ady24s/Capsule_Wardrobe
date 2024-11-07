const mongoose = require('mongoose');

const clothingItemSchema = new mongoose.Schema({
  top: {
    suitableForWeather: String,
    material: String,
    color: String,
    occasion: String,
    image: String,
  },
  bottom: {
    suitableForWeather: String,
    material: String,
    color: String,
    occasion: String,
    image: String,
  },
  shoes: {
    image: String,
  },
});

module.exports = mongoose.model('ClothingItem', clothingItemSchema);
