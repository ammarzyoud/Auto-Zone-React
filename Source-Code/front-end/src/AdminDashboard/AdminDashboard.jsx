import React, { Component } from "react";
import { connect } from "react-redux";
import NavBar from "../NavBar/Navbar";
import storage from "../Firebase/index";
import { authHeader } from "../_helpers";
import config from "config";
import FilterNav from "../FilterNav/FilterNav";
import { Link } from "react-router-dom";

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      progress: 0,
      uploaded: false,
      product: {
        imageName: "",
        prodName: "",
        prodDesc: "",
        prodFetr1: "",
        prodFetr2: "",
        category: "",
        prodPrice: ""
      }
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleChangeText = this.handleChangeText.bind(this);
    this.handleAddProduct = this.handleAddProduct.bind(this);
  }

  handleResponse(response) {
    return response.text().then(text => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  }

  handleChangeText(e) {
    const { name, value } = e.target;
    const { product } = this.state;
    e.preventDefault();
    this.setState({
      product: {
        ...product,
        [name]: value
      }
    });
    console.log(product.category);
  }

  handleChange(e) {
    e.preventDefault();
    if (e.target.files[0]) {
      const Image = e.target.files[0];
      this.setState({ image: Image });
    }
  }

  handleUpload(event) {
    const { image, product } = this.state;
    event.preventDefault();
    const uploadTask = storage.ref(`images/${image.name}`).put(image);
    uploadTask.on(
      "state_changed",
      snapshot => {
        // progress function ...
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        this.setState({ progress });
        this.setState({ uploaded: true });
      },
      error => {
        // Error function ...
        console.log(error);
      }
    );
    storage
      .ref("images")
      .child(image.name)
      .getDownloadURL()
      .then(url => {
        this.setState({
          product: {
            ...product,
            imageName: url
          }
        });
      });
  }

  handleAddProduct(event) {
    event.preventDefault();
    if (this.state.uploaded === true) {
      const { product } = this.state;
      const requestOptions = {
        method: "POST",
        headers: { ...authHeader(), "Content-Type": "application/json" },
        body: JSON.stringify(product)
      };
      return fetch(`${config.apiUrl}/product/addProduct`, requestOptions).then(
        this.handleResponse
      );
    } else {
      alert("please upload image first");
    }
  }

  render() {
    const { user } = this.props;
    return (
      <React.Fragment>
        <NavBar />
        <FilterNav />
        <div className="container">
          <h1 className="mt-4">Welcome Admin {user.firstName}</h1>
          <form className="mt-5">
            <h2>Add A product Or <Link to="/Edit">Edit & delete Products</Link></h2>
            <hr />
            {/* ------------------------------------------------------------ */}
            <div className="form-inline">
              <div className="form-group mb-2 mr-4">
                <label htmlFor="Image">Product Image</label>
                <input
                  id="Image"
                  className="form-control w-25 p-1 ml-3"
                  type="file"
                  onChange={this.handleChange}
                  required
                />
                <button
                  onClick={this.handleUpload}
                  className="btn btn-primary mb-2 ml-4"
                >
                  Upload Image
                </button>
              </div>
            </div>
            <div className="row mb-3">
              <progress
                value={this.state.progress}
                max="100"
                className="progress ml-3"
              />
            </div>
            <small>
              Please wait untill image is uploaded befor you add the rest of the
              product
            </small>
            <hr />
            {/* ------------------------------------------------------------ */}
            <div className="form-group">
              <label htmlFor="productName">Product Name</label>
              <input
                type="text"
                name="prodName"
                className="form-control w-25"
                id="productName"
                placeholder="Enter Product Name"
                onChange={this.handleChangeText}
                required
              />
            </div>
            {/* ------------------------------------------------------------ */}
            <div className="form-group">
              <label htmlFor="productDes">Product Descreption</label>
              <textarea
                type="text"
                name="prodDesc"
                className="form-control w-50"
                id="productDes"
                placeholder="Product Descreption"
                onChange={this.handleChangeText}
                required
              />
            </div>
            {/* ------------------------------------------------------------ */}
            <p>Product Features</p>
            <div class="form-row">
              <div class="form-group col-md-6">
                <label htmlFor="productFeature1">Product Feature 1</label>
                <input
                  type="text"
                  name="prodFetr1"
                  className="form-control"
                  id="productFeature1"
                  placeholder="Enter First Product Feature"
                  onChange={this.handleChangeText}
                  required
                />
              </div>
              <div class="form-group col-md-6">
                <label htmlFor="productFeature1">Product Feature 2</label>
                <input
                  type="text"
                  name="prodFetr2"
                  className="form-control"
                  id="productFeature1"
                  placeholder="Enter Second Product Feature"
                  onChange={this.handleChangeText}
                  required
                />
              </div>
            </div>
            {/* ------------------------------------------------------------ */}
            <p>Product Category</p>
            <select
              class="form-control"
              name="category"
              onChange={this.handleChangeText}
            >
              <option disabled selected value>
                select a category
              </option>
              <option value="Interior">Interior</option>
              <option value="Exterior">Exterior</option>
              <option value="Accessories">Accessories</option>
              <option value="Body">Body</option>
              <option value="Preformance">Preformance</option>
              <option value="Audio">Audio</option>
            </select>
            {/* ------------------------------------------------------------ */}
            <div className="form-group">
              <label htmlFor="productPrice">Product Price</label>
              <input
                type="number"
                name="prodPrice"
                className="form-control w-25"
                id="productPrice"
                placeholder="Enter Product Price"
                onChange={this.handleChangeText}
                required
              />
            </div>
            {/* ------------------------------------------------------------ */}
            <button
              onClick={this.handleAddProduct}
              className="btn btn-primary m-3"
            >
              Add
            </button>
          </form>
        </div>
      </React.Fragment>
    );
  }
}

function mapState(state) {
  const { authentication } = state;
  const { user } = authentication;
  const { registering } = state.registration;
  return { registering, user };
}

const connectedAdminDashboard = connect(mapState)(AdminDashboard);
export { connectedAdminDashboard as AdminDashboard };
