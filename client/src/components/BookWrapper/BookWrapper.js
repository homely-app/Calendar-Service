import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';
import PricingWrapper from '../PricingWrapper';
class BookWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let containerPointerClass = this.props.isCheckOutDisplayed
      ? 'checkin-calendar-container-pointer rotate'
      : 'checkin-calendar-container-pointer';

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
              {this.props.isCalendarDisplayed ? (
                <React.Fragment>
                  <svg
                    role="presentation"
                    focusable="false"
                    className={containerPointerClass}
                  >
                    <path
                      className="checkin-calendar-container-pointer-edge"
                      d="M0,20 40,20 20,0z"
                    />
                    <path
                      className="checkin-calendar-container-pointer-edge"
                      d="M0,20 20,0 40,20"
                    />
                  </svg>
                  <div className="checkin-calendar-container">
                    <div className="checkin-calendar">npm install calendar</div>
                  </div>
                </React.Fragment>
              ) : null}
              <h3 className="sub-title">Guests</h3>
              <div className="guest-subcontainer">
                <h3
                  className="guest-selector"
                  onClick={e => this.props.handleClick(e)}
                >
                  1 Guest
                </h3>
              </div>
              <PricingWrapper
                roomData={this.props.roomData}
                isPricingDisplayed={this.props.isPricingDisplayed}
              />
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
