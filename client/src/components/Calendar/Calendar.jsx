import React from 'react';
import PropTypes from 'prop-types';

const Calendar = (props) => {
  const {
    whichCalendar, renderHeader, renderDays, renderCells,
  } = props;
  const footer = whichCalendar !== 'Top' ? null : (
      <h3 className="sub-title">
        The minimum night stay for this listing varies. <br />
        Updated today
      </h3>
  );
  return (
    <div className="calendar">
      {renderHeader(whichCalendar)}
      {renderDays()}
      {renderCells(whichCalendar)}
      {footer}
    </div>
  );
};

Calendar.propTypes = {
  whichCalendar: PropTypes.string.isRequired,
  renderHeader: PropTypes.func.isRequired,
  renderDays: PropTypes.func.isRequired,
  renderCells: PropTypes.func.isRequired,
};

export default Calendar;
