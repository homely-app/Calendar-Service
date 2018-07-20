import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

class BookWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // TODO: correct this function, add taxes
    let totalBookingPrice;
    if (this.props.roomData) {
      totalBookingPrice =
        this.props.roomData.price +
        this.props.roomData.serviceFee +
        this.props.roomData.cleaningFee +
        this.props.roomData.cleaningFee;
    }

    return (
      <React.Fragment>
        {this.props.roomData ? (
          <div className="container">
            <div className="price-container">
              <h2 className="price">
                ${this.props.roomData.price}
                <span className="price-pernight"> per night</span>
              </h2>
            </div>
            <div className="book-container">
              <h3 className="sub-title">Dates</h3>
              <div className="book-subcontainer">
                <div className="book-checkin-container">
                  <h3
                    className="book-checkin"
                    onClick={e => this.props.handleClick(e)}
                  >
                    Check-in
                  </h3>
                </div>
                <div className="book-arrow-container">
                  <h3 className="book-arrow">➞</h3>
                </div>
                <div className="book-checkout-container">
                  <h3
                    className="book-checkout"
                    onClick={e => this.props.handleClick(e)}
                  >
                    Check-out
                  </h3>
                </div>
              </div>
              <h3 className="sub-title">Guests</h3>
              <div className="guest-subcontainer">
                <h3
                  className="guest-selector"
                  onClick={e => this.props.handleClick(e)}
                >
                  1 Guest
                </h3>
              </div>
              <div className="pricing-container">
                <div className="pricing-subcontainer">
                  <p className="pricing-item">
                    ${this.props.roomData.price} x 1 night
                  </p>
                  <p className="pricing-item">${this.props.roomData.price}</p>
                </div>
                <div className="pricing-subcontainer">
                  <p className="pricing-item"> Service fee</p>
                  <p className="pricing-item">
                    ${this.props.roomData.serviceFee}
                  </p>
                </div>
                <div className="pricing-subcontainer">
                  <p className="pricing-item">Cleaning fee</p>
                  <p className="pricing-item">
                    ${this.props.roomData.cleaningFee}
                  </p>
                </div>
                <div className="pricing-subcontainer">
                  <p className="pricing-item"> Occupancy taxes and fees</p>
                  <p className="pricing-item">
                    ${this.props.roomData.cleaningFee}
                  </p>
                </div>
                <div className="pricing-subcontainer">
                  <p className="pricing-total"> Total</p>
                  <p className="pricing-total">${totalBookingPrice}</p>
                </div>
              </div>
              <button id="book-button" onClick={e => this.props.handleClick(e)}>
                Book
              </button>
              <p className="disclaimer">You won’t be charged yet</p>
            </div>
            <div className="book-funfact-container">
              <div className="book-funfact">
                <h3 className="book-funfact-title">
                  This home is a former meth lab.
                </h3>
                <p className="book-funfact-comment">
                  It’s been raided 50+ times in the past month.
                </p>
              </div>
              <FontAwesome
                className="book-funfact-icon"
                name="lightbulb-o"
                size="2x"
              />
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default BookWrapper;
