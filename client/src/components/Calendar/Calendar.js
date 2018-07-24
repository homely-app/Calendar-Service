import React from 'react';
// import dateFns from 'date-fns';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // currentMonth: new Date(),
      // bookingStart: null,
      // bookingEnd: null
    };

    // this.onDateClick = this.onDateClick.bind(this);
    // this.nextMonth = this.nextMonth.bind(this);
    // this.prevMonth = this.prevMonth.bind(this);
  }

  // onDateClick(day) {
  //   this.setState({
  //     bookingStart: day
  //   });
  // }

  // nextMonth() {
  //   this.setState({
  //     currentMonth: dateFns.addMonths(this.state.currentMonth, 1)
  //   });
  // }

  // prevMonth() {
  //   this.setState({
  //     currentMonth: dateFns.subMonths(this.state.currentMonth, 1)
  //   });
  // }

  // renderHeader() {
  //   const dateFormat = 'MMMM YYYY';
  //   return (
  //     <div className="header">
  //       <div className="col col-start">
  //         <div className="calendar-icon" onClick={this.prevMonth}>
  //           ←
  //         </div>
  //       </div>
  //       <div className="col col-center">
  //         <span className="calendar-header">
  //           {dateFns.format(this.state.currentMonth, dateFormat)}
  //         </span>
  //       </div>
  //       <div className="col col-end" onClick={this.nextMonth}>
  //         <div className="calendar-icon">→</div>
  //       </div>
  //     </div>
  //   );
  // }

  // renderDays() {
  //   const dateFormat = 'dddd';
  //   const days = [];
  //   let startDate = dateFns.startOfWeek(this.state.currentMonth);
  //   for (let i = 0; i < 7; i++) {
  //     days.push(
  //       <div className="col col-center" key={i}>
  //         {dateFns
  //           .format(dateFns.addDays(startDate, i), dateFormat)
  //           .substring(0, 2)}
  //       </div>
  //     );
  //   }
  //   return <div className="days row-top">{days}</div>;
  // }

  // renderCells() {
  //   const { currentMonth, bookingStart } = this.state;
  //   const monthStart = dateFns.startOfMonth(currentMonth);
  //   const monthEnd = dateFns.endOfMonth(monthStart);
  //   const startDate = dateFns.startOfWeek(monthStart);
  //   const endDate = dateFns.endOfWeek(monthEnd);

  //   const dateFormat = 'D';
  //   const rows = [];
  //   let days = [];
  //   let day = startDate;
  //   let formattedDate = '';
  //   while (day <= endDate) {
  //     for (let i = 0; i < 7; i++) {
  //       formattedDate = dateFns.format(day, dateFormat);
  //       const cloneDay = day;
  //       days.push(
  //         <div
  //           className={`col cell ${
  //             !dateFns.isSameMonth(day, monthStart)
  //               ? 'disabled'
  //               : dateFns.isSameDay(day, bookingStart)
  //                 ? 'selected'
  //                 : ''
  //           }`}
  //           key={day}
  //           onClick={() => this.onDateClick(dateFns.parse(cloneDay))}
  //         >
  //           <span className="number">{formattedDate}</span>
  //         </div>
  //       );
  //       day = dateFns.addDays(day, 1);
  //     }
  //     rows.push(
  //       <div className="row" key={day}>
  //         {days}
  //       </div>
  //     );
  //     days = [];
  //   }

  //   return <div className="calendar-body">{rows}</div>;
  // }

  render() {
    return (
      <div className="calendar">
        {this.props.renderHeader()}
        {this.props.renderDays()}
        {this.props.renderCells()}
        <h3 className="sub-title">
          The minimum night stay for this listing varies. <br /> Updated today
        </h3>
      </div>
    );
  }
}

export default Calendar;
