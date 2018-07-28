import React from 'react';
import FontAwesome from 'react-fontawesome';
import PropTypes from 'prop-types';
import PricingWrapper from '../PricingWrapper/PricingWrapper';
import Calendar from '../Calendar';

const BookWrapper = (props) => {
  const {
    isCheckOutDisplayed,
    roomData,
    isCheckInDisplayed,
    checkInClassSelected,
    checkInClass,
    checkInTitle,
    checkOutClassSelected,
    checkOutClass,
    checkOutTitle,
    isCalendarDisplayed,
    renderHeader,
    renderDays,
    renderCells,
    isPricingDisplayed,
    bookingDuration,
  } = props;
  const containerPointerClass = isCheckOutDisplayed
    ? 'checkin-calendar-container-pointer rotate'
    : 'checkin-calendar-container-pointer';

  return (
    <React.Fragment>
      {roomData ? (
        <div className="container">
          <div className="price-container">
            <h2 className="price">
              ${roomData.price}
              <span className="price-pernight"> per night</span>
            </h2>
          </div>
          <div className="book-container">
            <h3 className="sub-title">Dates</h3>
            <div className="book-subcontainer">
              <div className="book-checkin-container">
                <h3
                  className={isCheckInDisplayed ? checkInClassSelected : checkInClass}
                  id="checkin"
                >
                  {checkInTitle}
                </h3>
              </div>
              <div className="book-arrow-container">
                <h3 className="book-arrow">➞</h3>
              </div>
              <div className="book-checkout-container">
                <h3
                  className={isCheckOutDisplayed ? checkOutClassSelected : checkOutClass}
                  id="checkout"
                >
                  {checkOutTitle}
                </h3>
              </div>
            </div>
            {isCalendarDisplayed ? (
              <React.Fragment>
                <svg role="presentation" focusable="false" className={containerPointerClass}>
                  <path
                    className="checkin-calendar-container-pointer-edge1"
                    d="M0,20 40,20 20,0z"
                  />
                  <path className="checkin-calendar-container-pointer-edge2" d="M0,20 20,0 40,20" />
                </svg>
                <div className="checkin-calendar-container">
                  <Calendar
                    renderHeader={renderHeader}
                    renderDays={renderDays}
                    renderCells={renderCells}
                    whichCalendar="Top"
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
              roomData={roomData}
              isPricingDisplayed={isPricingDisplayed}
              bookingDuration={bookingDuration}
            />
            <button type="submit" id="book-button">
              Book
            </button>
            <p className="disclaimer">You won’t be charged yet</p>
          </div>
          <div className="book-funfact-container">
            <div className="book-funfact">
              <h3 className="book-funfact-title">{roomData.funFactTitles}</h3>
              <p className="book-funfact-comment">{roomData.funFacts}</p>
            </div>
            <FontAwesome className="book-funfact-icon" name="lightbulb-o" size="2x" />
          </div>
        </div>
      ) : null}
    </React.Fragment>
  );
};

BookWrapper.propTypes = {
  isCheckOutDisplayed: PropTypes.bool.isRequired,
  roomData: PropTypes.object,
  isCheckInDisplayed: PropTypes.bool.isRequired,
  checkInClassSelected: PropTypes.string.isRequired,
  checkInClass: PropTypes.string.isRequired,
  checkInTitle: PropTypes.string.isRequired,
  checkOutClassSelected: PropTypes.string.isRequired,
  checkOutClass: PropTypes.string.isRequired,
  checkOutTitle: PropTypes.string.isRequired,
  isCalendarDisplayed: PropTypes.bool.isRequired,
  renderHeader: PropTypes.func.isRequired,
  renderDays: PropTypes.func.isRequired,
  renderCells: PropTypes.func.isRequired,
  isPricingDisplayed: PropTypes.bool.isRequired,
  bookingDuration: PropTypes.number.isRequired,
};

BookWrapper.defaultProps = {
  roomData: {},
};

export default BookWrapper;
