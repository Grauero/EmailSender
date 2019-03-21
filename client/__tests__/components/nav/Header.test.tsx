import 'jest';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Header, mapStateToProps } from '../../../src/components/nav/Header';

test('renders logo', () => {
  const logo = shallow(<Header auth={false} />).find('Link');

  expect(toJSON(logo)).toMatchSnapshot();
});

test('renders Login button if user isnt authorized', () => {
  const nav = shallow(<Header auth={false} />).find('ul');

  expect(toJSON(nav)).toMatchSnapshot();
});

test('renders Credits and Logout button if user is authorized', () => {
  const props = { googleId: 'id', credits: 5 };
  const nav = shallow(<Header auth={props} />).find('ul');

  expect(toJSON(nav)).toMatchSnapshot();
});

test('maps auth value from store to props', () => {
  const props = mapStateToProps({ auth: false, surveys: [], form: null });

  expect(props).toEqual({ auth: false });
});
