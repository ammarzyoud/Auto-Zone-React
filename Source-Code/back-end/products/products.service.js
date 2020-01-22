const DB = require("../_helpers/product.DB");
Product = DB.Products;
Cart = DB.Cart;
Favorite = DB.Favorite;

async function getProducts() {
  return await Product.find();
}

let addProduct = obj => {
  Product.insertMany([
    {
      prodName: obj.prodName,
      imgName: obj.imageName,
      prodDesc: obj.prodDesc,
      prodFetr1: obj.prodFetr1,
      prodFetr2: obj.prodFetr2,
      category: obj.category,
      prodPrice: obj.prodPrice
    }
  ]);
};

async function _delete(id) {
  await Product.deleteOne({ _id: id });
}

// --------------------------------------------------------------------------------------------------

let addToFavorite = obj => {
  Favorite.insertMany([
    {
      prodID: obj.id
    }
  ]);
};

async function getFavoritesProductsIds() {
  return await Favorite.find();
}

async function getFavoritesProducts(id) {
  return await Product.findById(id);
}

async function removeFromFavorites(id) {
  await Favorite.deleteMany({ prodID: id });
  return await getCartProductsIds();
}

// --------------------------------------------------------------------------------------------------

let addToCart = obj => {
  Cart.insertMany([
    {
      prodID: obj.id
    }
  ]);
};

async function getCartProductsIds() {
  return await Cart.find();
}

async function getCartProducts(id) {
  return await Product.findById(id);
}

async function removeFromCart(id) {
  await Cart.deleteMany({ prodID: id });
  return await getCartProductsIds();
}

// --------------------------------------------------------------------------------------------------

async function getAccessoriesProducts(param) {
  return await Product.find({ category: param });
}

module.exports = {
  addProduct,
  getProducts,
  _delete,
  // -----------------------
  addToCart,
  getCartProducts,
  getCartProductsIds,
  removeFromCart,
  // -----------------------
  addToFavorite,
  getFavoritesProducts,
  removeFromFavorites,
  getFavoritesProductsIds,
  // -----------------------
  getAccessoriesProducts
};
