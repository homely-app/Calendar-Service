import React, { Component } from 'react';

class AvailabilityWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="availability_container">
        <h2 className="availability_title">Availability</h2>
        <p>
          The minimum night stay for this listing varies. · Updated 29 days ago
        </p>
        <div className="calendar_container" />
      </div>
    );
  }
}

export default AvailabilityWrapper;
