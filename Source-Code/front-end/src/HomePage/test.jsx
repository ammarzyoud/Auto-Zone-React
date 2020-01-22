import React, { Component } from "react";
import config from "config";
import { authHeader } from "../_helpers";

export default class Test extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      url: ""
    };
    this.handleResponse = this.handleResponse.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  handleCartResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  }

  handleResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      this.setState({ products: data });
      return data;
    });
  }

  getProducts() {
    const requestOptions = {
      method: "GET",
      headers: authHeader()
    };
    console.log("getiimg");
    return fetch(`${config.apiUrl}/product/getProducts`, requestOptions).then(
      this.handleResponse
    );
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

  addToFavorite(ID) {
    let obj = { id: ID };
    const requestOptions = {
      method: "POST",
      headers: { ...authHeader(), "Content-Type": "application/json" },
      body: JSON.stringify(obj)
    };
    return fetch(`${config.apiUrl}/product/addToFavorite`, requestOptions).then(
      this.handleCartResponse
    );
  }

  render() {
    return (
      <div>
        <button onClick={() => this.getProducts()}>get prodd ?</button>
        {this.state.products.map(product => {
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
              <p>category : {product.category}</p>
              <p>price : {product.prodPrice}</p>
              <button
                onClick={() => this.addToCart(product._id)}
                className="btn btn-primary mb-2 ml-4"
              >
                Add to Cart
              </button>
              <button
                onClick={() => this.addToFavorite(product._id)}
                className="btn btn-warning mb-2 ml-4"
              >
                add to favorite
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
