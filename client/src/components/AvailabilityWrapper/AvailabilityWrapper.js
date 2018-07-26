import React, { Component } from 'react';
import Calendar from '../Calendar';

class AvailabilityWrapper extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="availability-container">
        <h2 className="availability-title">Availability</h2>
        <p>
          The minimum night stay for this listing varies. · Updated 29 minutes
          ago
        </p>
        <div className="calendar-container">
          <div className="calendar-container-left">
            <Calendar
              renderHeader={this.props.renderHeader}
              renderDays={this.props.renderDays}
              renderCells={this.props.renderCells}
              whichCalendar={'Left'}
            />
          </div>
          <div className="calendar-container-right">
            <Calendar
              renderHeader={this.props.renderHeader}
              renderDays={this.props.renderDays}
              renderCells={this.props.renderCells}
              whichCalendar={'Right'}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default AvailabilityWrapper;
