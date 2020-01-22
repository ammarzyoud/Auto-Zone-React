import React, { Component } from "react";
import config from "config";
import { authHeader } from "../_helpers";

export default class Edit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      products: [],
      url: ""
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
      this.setState({ products: data });
      return data;
    });
  }

  getProducts() {
    const requestOptions = {
      method: "GET",
      headers: authHeader()
    };
    return fetch(`${config.apiUrl}/product/getProducts`, requestOptions).then(
      this.handleResponse
    );
  }

  Edit(ID) {
    console.log(ID);
    // let obj = { id: ID };
    // const requestOptions = {
    //   method: "POST",
    //   headers: { ...authHeader(), "Content-Type": "application/json" },
    //   body: JSON.stringify(obj)
    // };
    // return fetch(`${config.apiUrl}/product/addToCart`, requestOptions).then(
    //   this.handleCartResponse
    // );
  }

  Delete(ID) {
    console.log(ID);
    const requestOptions = {
        method: "GET",
        headers: authHeader()
      };
      return fetch(
        `${config.apiUrl}/product/delete/${ID}`,
        requestOptions
      ).then(response => {
        this.setState({ IDs: response.data });
        window.location.reload();
      });
  }

  render() {
    return (
      <div>
        {this.state.products.map(product => {
          return (
            <div
              className="m-5"
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
                onClick={() => this.Edit(product._id)}
                className="btn btn-primary mb-2 ml-4"
              >
                Edit
              </button>
              <button
                onClick={() => this.Delete(product._id)}
                className="btn btn-danger mb-2 ml-4"
              >
                Delete
              </button>
            </div>
          );
        })}
      </div>
    );
  }
}
