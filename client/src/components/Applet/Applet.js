import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import dateFns from 'date-fns';
import BookWrapper from '../BookWrapper';
import AvailabilityWrapper from '../AvailabilityWrapper';

class Applet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      roomData: null,
      isCalendarDisplayed: false,
      isCheckInDisplayed: false,
      isCheckOutDisplayed: false,
      isPricingDisplayed: false,
      isValidBooking: false,
      currentMonth: new Date(),
      bookingStart: null,
      bookingEnd: null,
      bookingDuration: 1,
      checkInTitle: 'Check-in',
      checkInClass: 'book-checkin',
      checkInClassSelected: 'book-checkin-selected',
      checkOutTitle: 'Check-out',
      checkOutClass: 'book-checkout',
      checkOutClassSelected: 'book-checkout-selected',
      existingBookings: []
    };

    this.handleClick = this.handleClick.bind(this);
    this.onDateClick = this.onDateClick.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderDays = this.renderDays.bind(this);
    this.renderCells = this.renderCells.bind(this);
  }

  isValidDay(day) {
    if (dateFns.isPast(day)) {
      return false;
    }
    for (let i = 0; i < this.state.existingBookings.length; i++) {
      if (dateFns.isSameDay(day, this.state.existingBookings[i])) {
        return false;
      }
    }
    return true;
  }

  onDateClick(day) {
    let formattedDate = dateFns.format(day, 'MM/DD/YYYY');

    // check if start date needs to be reset
    if (
      this.state.bookingEnd &&
      day > this.state.bookingEnd &&
      this.state.isCheckInDisplayed
    ) {
      this.setState({
        bookingStart: day,
        bookingEnd: null,
        checkInTitle: formattedDate,
        checkOutTitle: 'Check-out',
        isCheckInDisplayed: false,
        isCheckOutDisplayed: true
      });
      return;
    }

    // check to set valid state date
    if (
      (!this.state.bookingStart || this.state.isCheckInDisplayed) &&
      this.isValidDay(day)
    ) {
      this.setState({
        bookingStart: day,
        checkInTitle: formattedDate,
        isCheckInDisplayed: false,
        isCheckOutDisplayed: true
      });
    }

    // check to set valid end date
    if (
      this.state.bookingStart &&
      day > this.state.bookingStart &&
      this.state.isCheckOutDisplayed &&
      this.isValidDay(day)
    ) {
      if (!this.isValidDuration(day)) {
        return;
      } else {
        let duration = dateFns.differenceInCalendarDays(
          day,
          this.state.bookingStart
        );
        this.setState({
          bookingEnd: day,
          isCalendarDisplayed: false,
          isCheckOutDisplayed: false,
          checkOutTitle: formattedDate,
          bookingDuration: duration
        });
      }
    }
  }

  isValidDuration(day) {
    let start = this.state.bookingStart;
    let end = day;
    for (let i = 0; i < this.state.existingBookings.length; i++) {
      if (dateFns.isWithinRange(this.state.existingBookings[i], start, end)) {
        return false;
      }
    }
    return true;
  }

  nextMonth() {
    this.setState({
      currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
    });
  }

  prevMonth() {
    this.setState({
      currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
    });
  }

  renderHeader(calendar) {
    const dateFormat = 'MMMM YYYY';
    const currentMonth = dateFns.format(this.state.currentMonth, dateFormat);
    const nextMonth = dateFns.format(
      dateFns.addMonths(this.state.currentMonth, 1),
      dateFormat
    );
    // TODO: handle lower calendar nav buttons correctly
    const leftNavButton = (
      <div
        className={
          calendar === 'Top' || calendar === 'Left' ? 'calendar-icon' : 'hidden'
        }
        onClick={
          calendar === 'Top' || calendar === 'Left' ? this.prevMonth : null
        }
      >
        ←
      </div>
    );
    const rightNavButton = (
      <div
        className={
          calendar === 'Top' || calendar === 'Right'
            ? 'calendar-icon'
            : 'hidden'
        }
        onClick={
          calendar === 'Top' || calendar === 'Right' ? this.nextMonth : null
        }
      >
        →
      </div>
    );
    return (
      <div className="header">
        <div className="col col-start">{leftNavButton}</div>
        <div className="col col-center">
          <span className="calendar-header">
            {calendar === 'Right' ? nextMonth : currentMonth}
          </span>
        </div>
        <div className="col col-end">{rightNavButton}</div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = 'dddd';
    const days = [];
    let startDate = dateFns.startOfWeek(this.state.currentMonth);
    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns
            .format(dateFns.addDays(startDate, i), dateFormat)
            .substring(0, 2)}
        </div>
      );
    }
    return <div className="days row-top">{days}</div>;
  }

  renderCells(calendar) {
    let { currentMonth, bookingStart, bookingEnd } = this.state;
    const nextMonth = dateFns.addMonths(this.state.currentMonth, 1);
    currentMonth = calendar === 'Right' ? nextMonth : currentMonth;

    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = 'D';
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';
    let disabled = 'disabled';
    let start = 'booking-start';
    let booking = 'booking';
    let end = 'booking-end';

    while (day <= endDate) {
      let cellClass;
      for (let i = 0; i < 7; i++) {
        formattedDate = dateFns.format(day, dateFormat);
        const cloneDay = day;

        if (dateFns.isSameDay(day, bookingStart)) {
          cellClass = `col cell ${start}`;
        } else if (dateFns.isSameDay(day, bookingEnd)) {
          cellClass = `col cell ${end}`;
        } else if (dateFns.isPast(day)) {
          cellClass = 'col cell booked';
        } else if (
          bookingStart &&
          bookingEnd &&
          dateFns.isWithinRange(day, bookingStart, bookingEnd)
        ) {
          cellClass = `col cell ${booking}`;
        } else {
          cellClass = 'col cell';
        }

        for (let i = 0; i < this.state.existingBookings.length; i++) {
          if (dateFns.isSameDay(day, this.state.existingBookings[i])) {
            cellClass = 'col cell booked';
          }
        }

        if (!dateFns.isSameMonth(day, monthStart)) {
          cellClass = `col cell ${disabled}`;
        }

        days.push(
          <div
            className={cellClass}
            key={day}
            onClick={() =>
              calendar === 'Top'
                ? this.onDateClick(dateFns.parse(cloneDay))
                : null
            }
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
      rows.push(
        <div className="row" key={day}>
          {days}
        </div>
      );
      days = [];
    }

    return <div className="calendar-body">{rows}</div>;
  }

  getRoomId() {
    let roomIdArray = window.location.pathname.split('/');
    let roomId = roomIdArray[roomIdArray.length - 1];
    this.setState({ roomId: roomId });
    return roomId;
  }

  getData() {
    let self = this;
    let roomId = this.getRoomId();
    const endpoint = `/api/rooms/${roomId}/bookings`;
    fetch(endpoint)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        self.setState({ roomData: myJson[0] });
        self.handleExistingBookings();
      });
  }

  handleClick(e) {
    if (e.target.innerHTML === 'Book') {
      this.handleBookButtonClick();
    } else if (e.target.id === 'checkin' || e.target.id === 'checkout') {
      this.handleBookingClick(e.target.id);
    } else if (e.target.id === 'guest') {
      this.handleGuestNumberClick();
    } else if (e.target.id === 'content-container') {
      this.setState({
        isCheckOutDisplayed: false,
        isCheckInDisplayed: false,
        isCalendarDisplayed: false
      });
    }
  }

  handleGuestNumberClick() {
    console.log('handleGuestNumberClick');
  }

  handleBookButtonClick() {
    if (!this.state.bookingStart || !this.state.bookingEnd) {
      alert('Please select a valid start and end date');
    } else {
      alert(
        `New Booking Request: ${this.state.bookingDuration} ${
          this.state.bookingDuration > 1 ? 'nights' : 'night'
        } for $${this.state.roomData.price * this.state.bookingDuration +
          this.state.roomData.serviceFee +
          this.state.roomData.cleaningFee +
          this.state.roomData.taxes}`
      );
      let newBooking = {
        id: `New booking starting on ${this.state.bookingStart}`,
        checkIn: dateFns.format(this.state.bookingStart),
        duration: this.state.bookingDuration
      };
      // console.log(newBooking);
      let roomData = this.state.roomData;
      let existingBookings = roomData.bookings.slice();
      existingBookings.push(newBooking);
      roomData.bookings = existingBookings;
      this.setState({
        roomData: roomData,
        isCalendarDisplayed: false,
        isCheckInDisplayed: false,
        isCheckOutDisplayed: false
      });
    }
  }

  handleBookingClick(bookButton) {
    if (bookButton === 'checkin') {
      if (this.state.isCheckOutDisplayed) {
        this.setState({ isCheckInDisplayed: true });
      } else if (
        !this.state.isCheckInDisplayed &&
        !this.state.isCheckOutDisplayed
      ) {
        this.setState({ isCheckInDisplayed: true });
        this.toggleCalendar();
      } else {
        this.setState({ isCheckInDisplayed: false });
        this.toggleCalendar();
      }
      this.setState({ isCheckOutDisplayed: false });
    } else if (bookButton === 'checkout') {
      if (this.state.isCheckInDisplayed) {
        this.setState({ isCheckOutDisplayed: true });
      } else if (
        !this.state.isCheckInDisplayed &&
        !this.state.isCheckOutDisplayed
      ) {
        this.setState({ isCheckOutDisplayed: true });
        this.toggleCalendar();
      } else {
        this.setState({ isCheckOutDisplayed: false });
        this.toggleCalendar();
      }
      this.setState({ isCheckInDisplayed: false });
    }
  }

  toggleCalendar() {
    let currentState = this.state.isCalendarDisplayed;
    this.setState({ isCalendarDisplayed: !currentState });
  }

  handleExistingBookings() {
    let existingBookings = this.state.roomData.bookings;
    let bookedDates = [];

    for (let i = 0; i < existingBookings.length; i++) {
      let duration = existingBookings[i].duration;
      bookedDates.push(new Date(existingBookings[i].checkIn));
      for (let j = 1; j < duration; j++) {
        bookedDates.push(
          dateFns.addDays(new Date(existingBookings[i].checkIn), j)
        );
      }
    }
    this.setState({ existingBookings: bookedDates });
  }

  componentDidMount() {
    this.getData();
    document.body.addEventListener('click', e => {
      // console.log(e.target);
      if (e.target === document.body) {
        e.stopImmediatePropagation();
        this.setState({
          isCheckOutDisplayed: false,
          isCheckInDisplayed: false,
          isCalendarDisplayed: false
        });
      } else {
        this.handleClick(e);
      }
    });
  }

  componentDidUpdate() {
    if (
      this.state.bookingStart &&
      this.state.bookingEnd &&
      !this.state.isPricingDisplayed
    ) {
      this.setState({ isPricingDisplayed: true });
    }

    ReactDOM.render(
      <AvailabilityWrapper
        roomData={this.state.roomData}
        renderHeader={this.renderHeader}
        renderDays={this.renderDays}
        renderCells={this.renderCells}
      />,
      document.getElementById('availability')
    );
  }

  render() {
    return (
      <React.Fragment>
        <BookWrapper
          roomData={this.state.roomData}
          isCalendarDisplayed={this.state.isCalendarDisplayed}
          isCheckInDisplayed={this.state.isCheckInDisplayed}
          isCheckOutDisplayed={this.state.isCheckOutDisplayed}
          isPricingDisplayed={this.state.isPricingDisplayed}
          renderHeader={this.renderHeader}
          renderDays={this.renderDays}
          renderCells={this.renderCells}
          checkInTitle={this.state.checkInTitle}
          checkOutTitle={this.state.checkOutTitle}
          bookingDuration={this.state.bookingDuration}
          checkInClass={this.state.checkInClass}
          checkOutClass={this.state.checkOutClass}
          checkInClassSelected={this.state.checkInClassSelected}
          checkOutClassSelected={this.state.checkOutClassSelected}
        />
      </React.Fragment>
    );
  }
}

export default Applet;
