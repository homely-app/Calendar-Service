import React, { Component } from 'react';

class PricingWrapper extends Component {
  render() {
    let totalBookingPrice;
    if (this.props.roomData) {
      totalBookingPrice =
        this.props.roomData.price * this.props.bookingDuration +
        this.props.roomData.serviceFee +
        this.props.roomData.cleaningFee +
        this.props.roomData.taxes;
    }

    return (
      <React.Fragment>
        {this.props.isPricingDisplayed ? (
          <div className="pricing-container">
            <div className="pricing-subcontainer">
              <p className="pricing-item">
                ${this.props.roomData.price} x {this.props.bookingDuration}{' '}
                {this.props.bookingDuration > 1 ? 'nights' : 'night'}
              </p>
              <p className="pricing-item">
                ${this.props.roomData.price * this.props.bookingDuration}
              </p>
            </div>
            <div className="pricing-subcontainer">
              <p className="pricing-item"> Service fee</p>
              <p className="pricing-item">${this.props.roomData.serviceFee}</p>
            </div>
            <div className="pricing-subcontainer">
              <p className="pricing-item">Cleaning fee</p>
              <p className="pricing-item">${this.props.roomData.cleaningFee}</p>
            </div>
            <div className="pricing-subcontainer">
              <p className="pricing-item"> Occupancy taxes and fees</p>
              <p className="pricing-item">${this.props.roomData.taxes}</p>
            </div>
            <div className="pricing-subcontainer">
              <p className="pricing-total"> Total</p>
              <p className="pricing-total">${totalBookingPrice}</p>
            </div>
          </div>
        ) : null}
      </React.Fragment>
    );
  }
}

export default PricingWrapper;
