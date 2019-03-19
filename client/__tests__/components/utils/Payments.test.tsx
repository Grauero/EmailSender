import 'jest';
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJSON from 'enzyme-to-json';

import { Payments } from '../../../src/components/utils/Payments';

const component = shallow(<Payments handleToken={jest.fn()} />);

test('matches snapshot', () => expect(toJSON(component)).toMatchSnapshot());
