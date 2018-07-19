import React, { Component } from 'react';
import FontAwesome from 'react-fontawesome';

const domain = process.env.DOMAIN || 'https://localhost:';
const port = process.env.PORT || '1128';

class Applet extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: 'world'
    };
  }

  getData() {
    console.log('getting data');
    // let self = this;
    const endpoint = '/bookings';
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
      <h1>
        Hello world! <FontAwesome name="rocket" size="2x" />
      </h1>
    );
  }
}

export default Applet;
