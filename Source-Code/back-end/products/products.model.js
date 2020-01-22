const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const schema = new Schema({
  prodName: { type: String },
  imgName: { type: String },
  prodDesc: { type: String },
  prodFetr1: { type: String },
  prodFetr2: { type: String },
  category: { type: String },
  prodPrice: { type: String },
  createdDate: { type: Date, default: Date.now }
});

schema.set("toJSON", { virtuals: true });

module.exports = mongoose.model("Products", schema);
