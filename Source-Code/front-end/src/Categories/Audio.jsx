import React, { Component } from "react";
import config from "config";
import { authHeader } from "../_helpers";
import Navbar from "../NavBar/Navbar";
import FilterNav from "../FilterNav/FilterNav";

export default class Audio extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: []
    };
    this.handleResponse = this.handleResponse.bind(this);
    this.getProducts = this.getProducts.bind(this);
  }

  componentDidMount() {
    this.getProducts();
  }

  handleResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      console.log(data);
      this.setState({ products: data });
      return data;
    });
  }

  getProducts() {
    Audio = "Audio";
    const requestOptions = {
      method: "GET",
      headers: authHeader()
    };
    return fetch(
      `${config.apiUrl}/product/getAccessoriesProducts/${Audio}`,
      requestOptions
    ).then(this.handleResponse);
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
        <Navbar />
        <FilterNav />
        Audio
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
