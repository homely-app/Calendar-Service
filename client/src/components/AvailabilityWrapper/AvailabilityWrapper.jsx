import React from 'react';
import Calendar from '../Calendar';

const AvailabilityWrapper = props => (
  <div className="availability-container">
    <h2 className="availability-title">Availability</h2>
    <p>The minimum night stay for this listing varies. · Updated 28 minutes ago</p>
    <div className="calendar-container">
      <div className="calendar-container-left">
        <Calendar
          renderHeader={props.renderHeader}
          renderDays={props.renderDays}
          renderCells={props.renderCells}
          whichCalendar="Left"
        />
      </div>
      <div className="calendar-container-right">
        <Calendar
          renderHeader={props.renderHeader}
          renderDays={props.renderDays}
          renderCells={props.renderCells}
          whichCalendar="Right"
        />
      </div>
    </div>
  </div>
);

export default AvailabilityWrapper;
