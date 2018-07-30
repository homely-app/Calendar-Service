import React, { Component } from "react";
import FontAwesome from "react-fontawesome";
import PricingWrapper from "../PricingWrapper";
import Calendar from "../Calendar";
class BookWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let containerPointerClass = this.props.isCheckOutDisplayed
      ? "checkin-calendar-container-pointer rotate"
      : "checkin-calendar-container-pointer";

    return (
      <React.Fragment>
        {this.props.roomData ? (
          <div className="booking-container">
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
                    className={
                      this.props.isCheckInDisplayed
                        ? this.props.checkInClassSelected
                        : this.props.checkInClass
                    }
                    id="checkin"
                  >
                    {this.props.checkInTitle}
                  </h3>
                </div>
                <div className="book-arrow-container">
                  <h3 className="book-arrow">➞</h3>
                </div>
                <div className="book-checkout-container">
                  <h3
                    className={
                      this.props.isCheckOutDisplayed
                        ? this.props.checkOutClassSelected
                        : this.props.checkOutClass
                    }
                    id="checkout"
                  >
                    {this.props.checkOutTitle}
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
                      className="checkin-calendar-container-pointer-edge1"
                      d="M0,20 40,20 20,0z"
                    />
                    <path
                      className="checkin-calendar-container-pointer-edge2"
                      d="M0,20 20,0 40,20"
                    />
                  </svg>
                  <div className="checkin-calendar-container">
                    <Calendar
                      renderHeader={this.props.renderHeader}
                      renderDays={this.props.renderDays}
                      renderCells={this.props.renderCells}
                      whichCalendar={"Top"}
                    />
                  </div>
                </React.Fragment>
              ) : null}
              <h3 className="sub-title">Guests</h3>
              <div className="guest-subcontainer">
                <h3 className="guest-selector" id="guest">
                  1 guest
                </h3>
              </div>
              <PricingWrapper
                roomData={this.props.roomData}
                isPricingDisplayed={this.props.isPricingDisplayed}
                bookingDuration={this.props.bookingDuration}
              />
              <button id="book-button">Book</button>
              <p className="disclaimer">You won’t be charged yet</p>
            </div>
            <div className="book-funfact-container">
              <div className="book-funfact">
                <h3 className="book-funfact-title">
                  {this.props.roomData.funFactTitles}
                </h3>
                <p className="book-funfact-comment">
                  {this.props.roomData.funFacts}
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
