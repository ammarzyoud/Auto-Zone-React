const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  prodID: { type: String },
  createdDate: { type: Date, default: Date.now }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Favorite", schema);
