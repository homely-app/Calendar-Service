import React, { Component } from "react";
import dateFns from "date-fns";
import BookWrapper from "../BookWrapper";
import AvailabilityWrapper from "../AvailabilityWrapper";
import Header from "../Header";

class Applet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomData: null,
      isCalendarDisplayed: false,
      isCheckInDisplayed: false,
      isCheckOutDisplayed: false,
      isPricingDisplayed: false,
      currentMonth: new Date(),
      bookingStart: null,
      bookingEnd: null,
      bookingDuration: 1,
      checkInTitle: "Check-in",
      checkInClass: "book-checkin",
      checkInClassSelected: "book-checkin-selected",
      checkOutTitle: "Check-out",
      checkOutClass: "book-checkout",
      checkOutClassSelected: "book-checkout-selected",
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

  componentDidMount() {
    this.getData();
    document.body.addEventListener('click', this.handleClick);
  }

  componentDidUpdate() {
    const { bookingStart, bookingEnd, isPricingDisplayed } = this.state;
    if (bookingStart && bookingEnd && !isPricingDisplayed) {
      this.updatePricing();
    }
  }

  onDateClick(day) {
    let formattedDate = dateFns.format(day, "MM/DD/YYYY");

    // check if start date needs to be reset
    if (
      bookingEnd
      && day > bookingEnd
      && isCheckInDisplayed
    ) {
      this.setState({
        bookingStart: day,
        bookingEnd: null,
        checkInTitle: formattedDate,
        checkOutTitle: "Check-out",
        isCheckInDisplayed: false,
        isCheckOutDisplayed: true,
      });
      return;
    }

    // check to set valid state date
    if (
      (!bookingStart || isCheckInDisplayed)
      && this.isValidDay(day)
    ) {
      this.setState({
        bookingStart: day,
        checkInTitle: formattedDate,
        isCheckInDisplayed: false,
        isCheckOutDisplayed: true,
      });
    }

    // check to set valid end date
    if (
      bookingStart
      && day > bookingStart
      && isCheckOutDisplayed
      && this.isValidDay(day)
    ) {
      if (!this.isValidDuration(day)) {
        return;
      }
      const duration = dateFns.differenceInCalendarDays(
        day,
        bookingStart,
      );
      this.setState({
        bookingEnd: day,
        checkOutTitle: formattedDate,
        bookingDuration: duration,
      });
    }
  }

  getData() {
    const self = this;
    const roomIdArray = window.location.pathname.split('/');
    const roomId = roomIdArray[roomIdArray.length - 1];
    const endpoint = `/api/bookings/${roomId}`;
    fetch(endpoint)
      .then(response => response.json())
      .then((myJson) => {
        self.setState({ roomData: myJson[0] });
        self.handleExistingBookings();
      });
  }

  prevMonth() {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: dateFns.subMonths(currentMonth, 1),
    });
  }

  nextMonth() {
    const { currentMonth } = this.state;
    this.setState({
      currentMonth: dateFns.addMonths(currentMonth, 1),
    });
  }

  renderHeader(calendar) {
    const dateFormat = "MMMM YYYY";
    const currentMonth = dateFns.format(this.state.currentMonth, dateFormat);
    const nextMonth = dateFns.format(
      dateFns.addMonths(this.state.currentMonth, 1),
      dateFormat
    );
    // TODO: handle lower calendar nav buttons correctly
    const leftNavButton = (
      <div
        className={
          calendar === "Top" || calendar === "Left" ? "calendar-icon" : "hidden"
        }
        onClick={
          calendar === "Top" || calendar === "Left" ? this.prevMonth : null
        }
      >
        ←
      </div>
    );
    const rightNavButton = (
      <div
        className={
          calendar === "Top" || calendar === "Right"
            ? "calendar-icon"
            : "hidden"
        }
        onClick={
          calendar === "Top" || calendar === "Right" ? this.nextMonth : null
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
            {calendar === "Right" ? nextMonth : currentMonth}
          </span>
        </div>
        <div className="col col-end">{rightNavButton}</div>
      </div>
    );
  }

  renderDays() {
    const dateFormat = "dddd";
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
    return true;
  }

  renderCells(calendar) {
    let { currentMonth, bookingStart, bookingEnd } = this.state;
    const nextMonth = dateFns.addMonths(this.state.currentMonth, 1);
    currentMonth = calendar === "Right" ? nextMonth : currentMonth;

    const monthStart = dateFns.startOfMonth(currentMonth);
    const monthEnd = dateFns.endOfMonth(monthStart);
    const startDate = dateFns.startOfWeek(monthStart);
    const endDate = dateFns.endOfWeek(monthEnd);

    const dateFormat = "D";
    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = "";
    let disabled = "disabled";
    let start = "booking-start";
    let booking = "booking";
    let end = "booking-end";

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
          cellClass = "col cell booked";
        } else if (
          bookingStart &&
          bookingEnd &&
          dateFns.isWithinRange(day, bookingStart, bookingEnd)
        ) {
          cellClass = `col cell ${booking}`;
        } else {
          cellClass = "col cell";
        }

        for (let i = 0; i < this.state.existingBookings.length; i++) {
          if (dateFns.isSameDay(day, this.state.existingBookings[i])) {
            cellClass = "col cell booked";
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
              calendar === "Top"
                ? this.onDateClick(dateFns.parse(cloneDay))
                : null
            }
          >
            <span className="number">{formattedDate}</span>
          </div>
        );
        day = dateFns.addDays(day, 1);
      }
    }

    return <div className="calendar-body">{rows}</div>;
  }

  getRoomId() {
    let roomIdArray = window.location.pathname.split("/");
    let roomId = roomIdArray[roomIdArray.length - 1];
    this.setState({ roomId: roomId });
    return roomId;
  }

  getData() {
    let self = this;
    let roomId = this.getRoomId();
    const endpoint = `/api/bookings/${roomId}`;
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
    if (e.target.innerHTML === "Book") {
      this.handleBookButtonClick();
    } else if (e.target.id === "checkin" || e.target.id === "checkout") {
      this.handleBookingClick(e.target.id);
    } else if (e.target.id === "guest") {
      this.handleGuestNumberClick();
    }
  }

  handleGuestNumberClick() {
    console.log("handleGuestNumberClick");
  }

  handleBookButtonClick() {
    if (!this.state.bookingStart || !this.state.bookingEnd) {
      alert("Please select a valid start and end date");
    } else {
      alert(
        `New Booking Request: ${this.state.bookingDuration} ${
          this.state.bookingDuration > 1 ? "nights" : "night"
        } for $${this.state.roomData.price * this.state.bookingDuration +
          this.state.roomData.serviceFee +
          this.state.roomData.cleaningFee +
          this.state.roomData.taxes}`
      );
    }
  }

  handleBookingClick(bookButton) {
    if (bookButton === "checkin") {
      if (this.state.isCheckOutDisplayed) {
        this.setState({ isCheckInDisplayed: true });
      } else if (!isCheckInDisplayed && !isCheckOutDisplayed) {
        this.setState({ isCheckInDisplayed: true });
        this.toggleCalendar();
      } else {
        this.setState({ isCheckInDisplayed: false });
        this.toggleCalendar();
      }
      this.setState({ isCheckOutDisplayed: false });
    } else if (bookButton === "checkout") {
      if (this.state.isCheckInDisplayed) {
        this.setState({ isCheckOutDisplayed: true });
      } else if (!isCheckInDisplayed && !isCheckOutDisplayed) {
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
    const { isCalendarDisplayed } = this.state;
    this.setState({ isCalendarDisplayed: !isCalendarDisplayed });
  }

  handleExistingBookings() {
    const { roomData } = this.state;
    const existingBookings = roomData.bookings;
    const bookedDates = [];

    for (let i = 0; i < existingBookings.length; i += 1) {
      const { duration } = existingBookings[i];
      bookedDates.push(new Date(existingBookings[i].checkIn));
      for (let j = 1; j < duration; j += 1) {
        bookedDates.push(
          dateFns.addDays(new Date(existingBookings[i].checkIn), j),
        );
      }
    }
    this.setState({ existingBookings: bookedDates });
  }

  componentDidMount() {
    this.getData();
    document.body.addEventListener("click", e => {
      console.log(e.target);
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

  renderDays() {
    const dateFormat = 'dddd';
    const days = [];
    const { currentMonth } = this.state;
    const startDate = dateFns.startOfWeek(currentMonth);
    for (let i = 0; i < 7; i += 1) {
      days.push(
        <div className="col col-center" key={i}>
          {dateFns
            .format(dateFns.addDays(startDate, i), dateFormat)
            .substring(0, 2)}
        </div>,
      );
    }
    return <div className="days row-top">{days}</div>;
  }

  renderHeader(calendar) {
    let { currentMonth } = this.state;
    const dateFormat = 'MMMM YYYY';
    currentMonth = dateFns.format(currentMonth, dateFormat);
    const nextMonth = dateFns.format(
      dateFns.addMonths(currentMonth, 1),
      dateFormat,
    );
    const leftNavButton = (
      <div
        className={
          calendar === 'Top' || calendar === 'Left' ? 'calendar-icon' : 'hidden'
        }
        onClick={
          calendar === 'Top' || calendar === 'Left' ? this.prevMonth : null
        }
        onKeyDown={this.prevMonth}
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

  render() {
    const {
      roomData,
      isCalendarDisplayed,
      isCheckInDisplayed,
      isCheckOutDisplayed,
      isPricingDisplayed,
      checkInTitle,
      checkOutTitle,
      bookingDuration,
      checkInClass,
      checkOutClass,
      checkInClassSelected,
      checkOutClassSelected,
    } = this.state;
    return (
      <React.Fragment>
        <Header />
        <BookWrapper
          roomData={roomData}
          isCalendarDisplayed={isCalendarDisplayed}
          isCheckInDisplayed={isCheckInDisplayed}
          isCheckOutDisplayed={isCheckOutDisplayed}
          isPricingDisplayed={isPricingDisplayed}
          checkInTitle={checkInTitle}
          checkOutTitle={checkOutTitle}
          bookingDuration={bookingDuration}
          checkInClass={checkInClass}
          checkOutClass={checkOutClass}
          checkInClassSelected={checkInClassSelected}
          checkOutClassSelected={checkOutClassSelected}
          renderHeader={this.renderHeader}
          renderDays={this.renderDays}
          renderCells={this.renderCells}
        />
        <AvailabilityWrapper
          roomData={roomData}
          renderHeader={this.renderHeader}
          renderDays={this.renderDays}
          renderCells={this.renderCells}
        />
      </React.Fragment>
    );
  }
}

export default Applet;
