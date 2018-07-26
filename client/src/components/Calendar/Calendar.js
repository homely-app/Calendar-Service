import React from 'react';
// import dateFns from 'date-fns';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const footer = this.props.isAvailabilityCalendar ? null : (
      <h3 className="sub-title">
        The minimum night stay for this listing varies. <br /> Updated today
      </h3>
    );
    return (
      <div className="calendar">
        {this.props.renderHeader()}
        {this.props.renderDays()}
        {this.props.renderCells()}
        {footer}
      </div>
    );
  }
}

export default Calendar;
