import React, { Component } from 'react';

class BookWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="container">
        <div className="price-container">
          <h2 className="price">
            {' '}
            $69 <span className="price-pernight">per night</span>
          </h2>
        </div>
        <div className="book-container">
          <h3 className="sub-title">Dates</h3>
          <div className="sub-container">
            <div className="book-checkin-container">
              <h3 className="book-checkin">Check-in</h3>
            </div>
            <div className="book-checkout-container">
              <h3 className="book-checkout">Check-out</h3>
            </div>
          </div>
          <h3 className="sub-title">Guests</h3>
          <div className="sub-container">
            <h3> 3 Guest</h3>
          </div>
          <button id="book-button">Book</button>
          <p className="disclaimer">You won’t be charged yet</p>
        </div>
      </div>
    );
  }
}

export default BookWrapper;
