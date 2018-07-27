import React from 'react';
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import 'isomorphic-fetch';

Enzyme.configure({ adapter: new Adapter() });
import PricingWrapper from './PricingWrapper';

let wrapper;
let instance;

beforeEach(() => {
  wrapper = Enzyme.mount(<PricingWrapper isPricingDisplayed={false} />);
  instance = wrapper.instance();
});

describe('PricingWrapper', function() {
  it('should hide pricing on mount', () => {
    expect(instance.props.isPricingDisplayed).toBe(false);
  });
});
