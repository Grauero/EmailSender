import 'jest';
import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import toJSON from 'enzyme-to-json';

import {
  Payments,
  mapDispatchToProps
} from '../../../src/components/utils/Payments';
import { store } from '../../../mocks/testConfig';

const props = { handleToken: jest.fn() };
const component = shallow(<Payments {...props} />);

test('matches snapshot', () => expect(toJSON(component)).toMatchSnapshot());

test('passes down props.handleToken to <StripeCheckout /> component', () => {
  // simulate props.handleToken call
  component.prop('token')();

  expect(props.handleToken).toHaveBeenCalled();
  expect(props.handleToken).toHaveBeenCalledTimes(1);
});

test('dispatches handleToken from store to props', async () => {
  const props = mapDispatchToProps(jest.fn());

  expect(Object.keys(props)[0]).toBe('handleToken');
});
