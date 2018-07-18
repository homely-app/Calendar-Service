import React from 'react';

class Applet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hello: 'world'
    };
  }

  exampleFunction() {
    console.log('example function');
  }

  render() {
    return <h1> Hello {this.state.hello} </h1>;
  }
}

export default Applet;
