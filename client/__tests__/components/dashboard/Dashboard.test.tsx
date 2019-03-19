import 'jest';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Dashboard from '../../../src/components/dashboard/Dashboard';

test('matches snapshot', () => {
  expect(toJSON(shallow(<Dashboard />))).toMatchSnapshot();
});
