const config = require("config.json");
const mongoose = require("mongoose");
mongoose.connect(process.env.MONGODB_URI || config.connectionString, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;

module.exports = {
  Products: require("../products/products.model"),
  Cart: require("../products/cart.model"),
  Favorite: require("../products/favorite.model")
};
