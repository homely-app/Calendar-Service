import React, { Component } from 'react';
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
      isValidBooking: false
    };

    this.handleClick = this.handleClick.bind(this);
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
        />
        <AvailabilityWrapper roomData={this.state.roomData} />
      </React.Fragment>
    );
  }
}

export default Applet;
