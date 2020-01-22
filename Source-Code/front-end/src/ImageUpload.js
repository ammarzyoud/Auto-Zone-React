import React, { Component } from "react";
import storage from "./Firebase/index";

class ImageUpload extends Component {
  render() {
    return (
      <div className="container">
        <br />
        <div className="form-group">
          <div className="form-group">
            <label htmlFor="Image">Image</label>
            <input
              id="Image"
              className="form-control w-25 p-1"
              type="file"
              onChange={this.handleChange}
            />
          </div>
          <div className="row">
            <progress
              value={this.state.progress}
              max="100"
              className="progress ml-3"
            />
          </div>
        </div>
        <button onClick={this.handleUpload} className="btn btn-primary m-3">
          Upload
        </button>
        {/* <img
          src={this.state.url || "https://via.placeholder.com/400x300"}
          alt="Uploaded Images"
          height="300"
          width="400"
        /> */}
      </div>
    );
  }
}

export default ImageUpload;
