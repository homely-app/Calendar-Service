import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';

Enzyme.configure({ adapter: new Adapter() });
import Applet from './Applet';
import Header from './../Header';
import BookWrapper from './../BookWrapper';
import AvailabilityWrapper from './../AvailabilityWrapper';

let wrapper = {};
let instance;
let getDataSpy;
beforeEach(() => {
  getDataSpy = jest.spyOn(Applet.prototype, 'getData');
  wrapper = Enzyme.mount(<Applet />);
  instance = wrapper.instance();
});

describe('Applet', function() {
  // TODO: fetch API requires a complete URL?
  // it('should call getData when component mounts', done => {
  //   expect(getDataSpy).toHaveBeenCalled();
  // });

  it('should render a header', () => {
    expect(wrapper.contains(<Header />)).toBe(true);
  });

  it('should render a BookWrapper', () => {
    expect(
      wrapper.contains(
        <BookWrapper
          roomData={instance.state.roomData}
          isCalendarDisplayed={instance.state.isCalendarDisplayed}
          isCheckInDisplayed={instance.state.isCheckInDisplayed}
          isCheckOutDisplayed={instance.state.isCheckOutDisplayed}
          isPricingDisplayed={instance.state.isPricingDisplayed}
          renderHeader={instance.renderHeader}
          renderDays={instance.renderDays}
          renderCells={instance.renderCells}
          checkInTitle={instance.state.checkInTitle}
          checkOutTitle={instance.state.checkOutTitle}
          bookingDuration={instance.state.bookingDuration}
          checkInClass={instance.state.checkInClass}
          checkOutClass={instance.state.checkOutClass}
          checkInClassSelected={instance.state.checkInClassSelected}
          checkOutClassSelected={instance.state.checkOutClassSelected}
        />
      )
    ).toBe(true);
  });

  it('should render a AvailabilityWrapper', () => {
    expect(
      wrapper.contains(
        <AvailabilityWrapper
          roomData={instance.state.roomData}
          renderHeader={instance.renderHeader}
          renderDays={instance.renderDays}
          renderCells={instance.renderCells}
        />
      )
    ).toBe(true);
  });

  it('should mount with the correct initial state', () => {
    expect(wrapper.state('isCalendarDisplayed')).toEqual(false);
    expect(wrapper.state('isCheckInDisplayed')).toEqual(false);
    expect(wrapper.state('isCheckOutDisplayed')).toEqual(false);
    expect(wrapper.state('checkInTitle')).toEqual('Check-in');
    expect(wrapper.state('checkOutTitle')).toEqual('Check-out');
  });

  it('should have custom methods', () => {
    expect(typeof instance.isValidDay).toBe('function');
    expect(typeof instance.onDateClick).toBe('function');
    expect(typeof instance.isValidDuration).toBe('function');
    expect(typeof instance.nextMonth).toBe('function');
    expect(typeof instance.prevMonth).toBe('function');
    expect(typeof instance.renderHeader).toBe('function');
    expect(typeof instance.renderDays).toBe('function');
    expect(typeof instance.renderCells).toBe('function');
    expect(typeof instance.getRoomId).toBe('function');
    expect(typeof instance.getData).toBe('function');
    expect(typeof instance.handleClick).toBe('function');
    expect(typeof instance.handleGuestNumberClick).toBe('function');
    expect(typeof instance.handleBookButtonClick).toBe('function');
    expect(typeof instance.handleBookingClick).toBe('function');
    expect(typeof instance.toggleCalendar).toBe('function');
    expect(typeof instance.handleExistingBookings).toBe('function');
    expect(typeof instance.handleExistingBookings).toBe('function');
  });
});
