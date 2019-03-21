import 'jest';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { App, mapDispatchToProps } from '../../src/components/App';

const props = { fetchUser: jest.fn() };
const component = shallow(<App {...props} />);

test('calls props.fetchUser when component mounts', () => {
  expect(props.fetchUser).toHaveBeenCalled();
  expect(props.fetchUser).toHaveBeenCalledTimes(1);
});

test('matches snapshot', () => expect(toJSON(component)).toMatchSnapshot());

test('dispatches fetchUser from store to props', () => {
  const props = mapDispatchToProps(jest.fn());

  expect(Object.keys(props)[0]).toBe('fetchUser');
});
