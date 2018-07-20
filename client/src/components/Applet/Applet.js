import React, { Component } from 'react';
import BookWrapper from '../BookWrapper';
import AvailabilityWrapper from '../AvailabilityWrapper';

class Applet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      roomId: null,
      roomData: null,
      isCheckInCalendarDisplayed: false,
      isCheckOutCalendarDisplayed: false
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
    console.log(roomId);
    const endpoint = `/api/bookings/${roomId}`;
    fetch(endpoint)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
        self.setState({ roomData: myJson[0] });
      });
  }

  handleClick(e) {
    console.log('clicked', e.target.innerHTML);
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
  }

  handleGuestNumberClick() {
    console.log('handleGuestNumberClick');
  }

  handleBookButtonClick() {
    alert('booked!');
  }

  handleBookingClick(bookButton) {
    console.log('handleBookingClick');
    if (bookButton === 'Check-in') {
      this.toggleCheckInCalendar();
    } else {
      this.toggleCheckOutCalendar();
    }
  }

  toggleCheckInCalendar() {
    let currentState = this.state.isCheckInCalendarDisplayed;
    this.setState({ isCheckInCalendarDisplayed: !currentState });
  }

  toggleCheckOutCalendar() {
    let currentState = this.state.isCheckOutCalendarDisplayed;
    this.setState({ isCheckOutCalendarDisplayed: !currentState });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <React.Fragment>
        <BookWrapper
          roomData={this.state.roomData}
          isCheckInCalendarDisplayed={this.state.isCheckInCalendarDisplayed}
          isCheckOutCalendarDisplayed={this.state.isCheckOutCalendarDisplayed}
          handleClick={this.handleClick}
        />
        <AvailabilityWrapper roomData={this.state.roomData} />
      </React.Fragment>
    );
  }
}

export default Applet;
