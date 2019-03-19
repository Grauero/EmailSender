import 'jest';
import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import toJSON from 'enzyme-to-json';

import Spinner from '../../../src/components/utils/Spinner';

const component = shallow(<Spinner />);

test('matches snapshot', () => expect(toJSON(component)).toMatchSnapshot());
