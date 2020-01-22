import React, { Component } from "react";
import { connect } from "react-redux";
import config from "config";
import { authHeader } from "../_helpers";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      IDs: []
    };
    this.handleResponse = this.handleResponse.bind(this);
    this.handleProductResponse = this.handleProductResponse.bind(this);
    this.getCartProductsIds = this.getCartProductsIds.bind(this);
    this.getCartProducts = this.getCartProducts.bind(this);
  }

  componentDidMount() {
    this.getCartProductsIds();
  }

  handleResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      this.setState({ IDs: data });
      this.getCartProducts();
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

  getCartProducts() {
    const { IDs } = this.state;
    let newIDs = this.removeDup(IDs, "prodID");
    newIDs.forEach(ID => {
      const requestOptions = {
        method: "GET",
        headers: authHeader()
      };
      return fetch(
        `${config.apiUrl}/product/getCartProducts/${ID.prodID}`,
        requestOptions
      ).then(this.handleProductResponse);
    });
  }

  getCartProductsIds() {
    const requestOptions = {
      method: "GET",
      headers: authHeader()
    };
    return fetch(
      `${config.apiUrl}/product/getCartProductsIds`,
      requestOptions
    ).then(this.handleResponse);
  }

  RemoveFromCart(ID) {
    const requestOptions = {
      method: "GET",
      headers: authHeader()
    };
    return fetch(
      `${config.apiUrl}/product/removeFromCart/${ID}`,
      requestOptions
    ).then(response => {
      this.setState({ IDs: response.data });
      window.location.reload();
    });
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
        <h1>Cart</h1>
        {this.state.products.map(product => {
          return (
            <div
              key={product._id}
              style={{ border: "1px solid black", width: "400px" }}
            >
              <p>{product.prodName}</p>
              <img width="300px" src={product.imgName} alt="" />
              <button
                onClick={() => this.RemoveFromCart(product._id)}
                className="btn btn-danger mb-2 ml-4"
              >
                Remove From Cart
              </button>
              <button
                onClick={() => this.addToFavorite(product._id)}
                className="btn btn-primary mb-2 ml-4"
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

const connectedCart = connect()(Cart);
export { connectedCart as Cart };
