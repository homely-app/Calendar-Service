import React, { Component } from 'react';

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
                  <h3 className="book-checkin">Check-in</h3>
                </div>
                <div className="book-checkout-container">
                  <h3 className="book-checkout">Check-out</h3>
                </div>
              </div>
              <h3 className="sub-title">Guests</h3>
              <div className="guest-subcontainer">
                <h3 className="guest-selector"> 1 Guest</h3>
              </div>
              <div className="pricing-container">
                <div className="pricing-subcontainer">
                  <p className="pricing-item">
                    {' '}
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
              <button id="book-button">Book</button>
              <p className="disclaimer">You won’t be charged yet</p>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default BookWrapper;
