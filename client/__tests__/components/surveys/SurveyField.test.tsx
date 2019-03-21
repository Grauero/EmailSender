import 'jest';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import SurveyField from '../../../src/components/surveys/SurveyField';

const props = {
  input: {},
  label: 'label',
  meta: { error: 'error', touched: true }
};
const component = shallow(<SurveyField {...props} />);

test('matches snapshot', () => expect(toJSON(component)).toMatchSnapshot());
