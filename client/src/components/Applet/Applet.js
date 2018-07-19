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
    let data = JSON.stringify({ data: 'hello world' });
    const endpoint = '/repos';
    this.postData(domain + port + endpoint, data)
      .then(data => console.log(data)) // JSON from `response.json()` call
      .catch(error => console.error(error));
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
