import React from 'react';

const PricingWrapper = (props) => {
  let totalBookingPrice;
  if (props.roomData) {
    totalBookingPrice = props.roomData.price * props.bookingDuration
      + props.roomData.serviceFee
      + props.roomData.cleaningFee
      + props.roomData.taxes;
  }

  return (
    <React.Fragment>
      {props.isPricingDisplayed ? (
        <div className="pricing-container">
          <div className="pricing-subcontainer">
            <p className="pricing-item">
              ${props.roomData.price} x {props.bookingDuration}{' '}
              {props.bookingDuration > 1 ? 'nights' : 'night'}
            </p>
            <p className="pricing-item">${props.roomData.price * props.bookingDuration}</p>
          </div>
          <div className="pricing-subcontainer">
            <p className="pricing-item"> Service fee</p>
            <p className="pricing-item">${props.roomData.serviceFee}</p>
          </div>
          <div className="pricing-subcontainer">
            <p className="pricing-item">Cleaning fee</p>
            <p className="pricing-item">${props.roomData.cleaningFee}</p>
          </div>
          <div className="pricing-subcontainer">
            <p className="pricing-item"> Occupancy taxes and fees</p>
            <p className="pricing-item">${props.roomData.taxes}</p>
          </div>
          <div className="pricing-subcontainer">
            <p className="pricing-total"> Total</p>
            <p className="pricing-total">${totalBookingPrice}</p>
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

export default PricingWrapper;
