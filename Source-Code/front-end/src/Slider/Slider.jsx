import React, { Component } from "react";
import { connect } from "react-redux";

export default class Slider extends Component {
  render() {
    return (
      <div id="mu-slider">
        <div className="mu-slide">
          <div className="mu-single-slide">
            <img src="assets/images/slider-img-1.jpg" alt="slider img" />
            <div className="mu-single-slide-content-area">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mu-single-slide-content">
                      <h1>Welcome to Auto Zone</h1>
                      <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Aenean commodo ligula eget dolor. Aenean massa.
                        Cum sociis natoque penatibus et magnis dis parturient
                        montes, nascetur ridiculus mus. Donec quam felis,
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mu-single-slide">
            <img src="assets/images/slider-img-2.jpg" alt="slider img" />
            <div className="mu-single-slide-content-area">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mu-single-slide-content">
                      <h1>Free Delivery in Jordan !</h1>
                      <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Aenean commodo ligula eget dolor. Aenean massa.
                        Cum sociis natoque penatibus et magnis dis parturient
                        montes, nascetur ridiculus mus. Donec quam felis,
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mu-single-slide">
            <img src="assets/images/slider-img-3.jpg" alt="slider img" />
            <div className="mu-single-slide-content-area">
              <div className="container">
                <div className="row">
                  <div className="col-md-12">
                    <div className="mu-single-slide-content">
                      <h1>Best Car parts</h1>
                      <p>
                        Lorem ipsum dolor sit amet, consectetuer adipiscing
                        elit. Aenean commodo ligula eget dolor. Aenean massa.
                        Cum sociis natoque penatibus et magnis dis parturient
                        montes, nascetur ridiculus mus. Donec quam felis,
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const connectedSlider = connect()(Slider);
