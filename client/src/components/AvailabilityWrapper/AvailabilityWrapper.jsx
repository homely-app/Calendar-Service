import React from 'react';
import PropTypes from 'prop-types';
import Calendar from '../Calendar';

const AvailabilityWrapper = (props) => {
  const { renderHeader, renderDays, renderCells } = props;
  return (
    <div className="availability-container">
      <h2 className="availability-title">Availability</h2>
      <p>The minimum night stay for this listing varies. · Updated 28 minutes ago</p>
      <div className="calendar-container">
        <div className="calendar-container-left">
          <Calendar
            renderHeader={renderHeader}
            renderDays={renderDays}
            renderCells={renderCells}
            whichCalendar="Left"
          />
        </div>
        <div className="calendar-container-right">
          <Calendar
            renderHeader={renderHeader}
            renderDays={renderDays}
            renderCells={renderCells}
            whichCalendar="Right"
          />
        </div>
      </div>
    </div>
  );
};

AvailabilityWrapper.propTypes = {
  renderHeader: PropTypes.func.isRequired,
  renderDays: PropTypes.func.isRequired,
  renderCells: PropTypes.func.isRequired,
};

export default AvailabilityWrapper;
