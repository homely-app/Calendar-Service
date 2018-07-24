import React, { Component } from 'react';
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
      bookingEnd: null
    };

    this.handleClick = this.handleClick.bind(this);
    this.onDateClick = this.onDateClick.bind(this);
    this.nextMonth = this.nextMonth.bind(this);
    this.prevMonth = this.prevMonth.bind(this);
    this.renderHeader = this.renderHeader.bind(this);
    this.renderDays = this.renderDays.bind(this);
    this.renderCells = this.renderCells.bind(this);
  }

  onDateClick(day) {
    if (!this.state.bookingStart) {
      this.setState({
        bookingStart: day
      });
    }

    if (this.state.bookingStart) {
      this.setState({
        bookingEnd: day
      });
    }
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

  renderHeader() {
    const dateFormat = 'MMMM YYYY';
    return (
      <div className="header">
        <div className="col col-start">
          <div className="calendar-icon" onClick={this.prevMonth}>
            ←
          </div>
        </div>
        <div className="col col-center">
          <span className="calendar-header">
            {dateFns.format(this.state.currentMonth, dateFormat)}
          </span>
        </div>
        <div className="col col-end" onClick={this.nextMonth}>
          <div className="calendar-icon">→</div>
        </div>
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

  renderCells() {
    const { currentMonth, bookingStart, bookingEnd } = this.state;
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

        if (!dateFns.isSameMonth(day, monthStart)) {
          cellClass = `col cell ${disabled}`;
        } else if (dateFns.isSameDay(day, bookingStart)) {
          cellClass = `col cell ${start}`;
        } else if (dateFns.isSameDay(day, bookingEnd)) {
          cellClass = `col cell ${end}`;
        } else if (
          bookingStart &&
          bookingEnd &&
          dateFns.isWithinRange(day, bookingStart, bookingEnd)
        ) {
          cellClass = `col cell ${booking}`;
        } else {
          cellClass = 'col cell';
        }

        days.push(
          <div
            className={cellClass}
            key={day}
            onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
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
    const endpoint = `/api/bookings/${roomId}`;
    fetch(endpoint)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        self.setState({ roomData: myJson[0] });
      });
  }

  handleClick(e) {
    if (e.target.innerHTML === 'Book') {
      this.handleBookButtonClick();
    } else if (
      e.target.innerHTML === 'Check-in' ||
      e.target.innerHTML === 'Check-out'
    ) {
      this.handleBookingClick(e.target.innerHTML);
    } else if (e.target.innerHTML === '1 Guest') {
      this.handleGuestNumberClick();
    }
    if (e.target.id === 'root') {
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
    alert('booked!');
  }

  handleBookingClick(bookButton) {
    if (bookButton === 'Check-in') {
      if (this.state.isCheckOutDisplayed) {
        this.setState({ isCheckInDisplayed: true });
      } else {
        this.toggleCalendar();
      }
      this.setState({ isCheckInDisplayed: true });
      this.setState({ isCheckOutDisplayed: false });
    } else if (bookButton === 'Check-out') {
      if (this.state.isCheckInDisplayed) {
        this.setState({ isCheckOutDisplayed: true });
      } else {
        this.toggleCalendar();
      }
      this.setState({ isCheckInDisplayed: false });
      this.setState({ isCheckOutDisplayed: true });
    }
  }

  toggleCalendar() {
    let currentState = this.state.isCalendarDisplayed;
    this.setState({ isCalendarDisplayed: !currentState });
  }

  componentDidMount() {
    this.getData();
    document.body.addEventListener('click', this.handleClick);
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
        />
        <AvailabilityWrapper roomData={this.state.roomData} />
      </React.Fragment>
    );
  }
}

export default Applet;
