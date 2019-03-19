import 'jest';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Landing from '../../../src/components/nav/Landing';

const component = shallow(<Landing />);

test('matches snapshot', () => expect(toJSON(component)).toMatchSnapshot());
