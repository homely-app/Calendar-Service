import React, { Component } from 'react';
// import FontAwesome from 'react-fontawesome';
import BookWrapper from '../BookWrapper';
import AvailabilityWrapper from '../AvailabilityWrapper';

const domain = process.env.DOMAIN || 'https://localhost:';
const port = process.env.PORT || '1128';

class Applet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 1
    };
  }

  test() {
    console.log('2ndtest');
  }

  getData() {
    console.log('getting data');
    // let self = this;
    const endpoint = `/api/bookings/${this.state.id}`;
    fetch(domain + port + endpoint)
      .then(function(response) {
        return response.json();
      })
      .then(function(myJson) {
        console.log(myJson);
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <React.Fragment>
        <BookWrapper />
        <AvailabilityWrapper />
      </React.Fragment>
    );
  }
}

export default Applet;
