import React, { Component } from "react";
import { connect } from "react-redux";
import config from "config";
import { authHeader } from "../_helpers";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      IDs: []
    };
    this.handleResponse = this.handleResponse.bind(this);
    this.handleProductResponse = this.handleProductResponse.bind(this);
    this.getFavoritesProductsIds = this.getFavoritesProductsIds.bind(this);
    this.getFavoritesProducts = this.getFavoritesProducts.bind(this);
  }

  componentDidMount() {
    this.getFavoritesProductsIds();
  }

  handleResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      this.setState({ IDs: data });
      this.getFavoritesProducts();
      return data;
    });
  }

  handleProductResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      this.setState({ products: [...this.state.products, data] });
      return data;
    });
  }

  removeDup(arr, param) {
    return arr.filter((item, i, array) => {
      return (
        array
          .map(mapItem => {
            return mapItem[param];
          })
          .indexOf(item[param]) === i
      );
    });
  }

  getFavoritesProducts() {
    const { IDs } = this.state;
    let newIDs = this.removeDup(IDs, "prodID");
    newIDs.forEach(ID => {
      const requestOptions = {
        method: "GET",
        headers: authHeader()
      };
      return fetch(
        `${config.apiUrl}/product/getFavoritesProducts/${ID.prodID}`,
        requestOptions
      ).then(this.handleProductResponse);
    });
  }

  getFavoritesProductsIds() {
    const requestOptions = {
      method: "GET",
      headers: authHeader()
    };
    return fetch(
      `${config.apiUrl}/product/getFavoritesProductsIds`,
      requestOptions
    ).then(this.handleResponse);
  }

  removeFromFavorites(ID) {
    const requestOptions = {
      method: "GET",
      headers: authHeader()
    };
    return fetch(
      `${config.apiUrl}/product/removeFromFavorites/${ID}`,
      requestOptions
    ).then(response => {
      this.setState({ IDs: response.data });
      window.location.reload();
    });
  }

  addToCart(ID) {
    let obj = { id: ID };
    const requestOptions = {
      method: "POST",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(obj)
    };
    return fetch(`${config.apiUrl}/product/addToCart`, requestOptions).then(
      this.handleCartResponse
    );
  }

  showProducts() {
    if (this.state.products.length > 0) {
      return this.state.products.map(product => {
        return (
          <div
            key={product._id}
            style={{ border: "1px solid black", width: "400px" }}
          >
            <p>{product.prodName}</p>
            <img width="300px" src={product.imgName} alt="" />
            <p> Description : {product.prodDesc}</p>
            <p>
              features : {product.prodFetr1} , {product.prodFetr2}
            </p>
            <p>price : {product.prodPrice}</p>
            <button
              onClick={() => this.addToCart(product._id)}
              className="btn btn-primary mb-2 ml-4"
            >
              Add to Cart
            </button>
            <button
              onClick={() => this.removeFromFavorites(product._id)}
              className="btn btn-danger mb-2 ml-4"
            >
              Remove From Favorites
            </button>
          </div>
        );
      });
    } else {
      return (
        <div>
          <p>No products</p>
        </div>
      );
    }
  }

  render() {
    return (
      <div>
        <h1>Favorites</h1>
        {this.showProducts()}
        {/* {this.state.products.map(product => {
          return (
            <div
              key={product._id}
              style={{ border: "1px solid black", width: "400px" }}
            >
              <p>{product.prodName}</p>
              <img width="300px" src={product.imgName} alt="" />
              <button
                onClick={() => this.addToCart(product._id)}
                className="btn btn-primary mb-2 ml-4"
              >
                Add to Cart
              </button>
              <button
                onClick={() => this.removeFromFavorites(product._id)}
                className="btn btn-danger mb-2 ml-4"
              >
                Remove From Favorites
              </button>
            </div>
          );
        })} */}
      </div>
    );
  }
}

const connectedFavorites = connect()(Favorites);
export { connectedFavorites as Favorites };
