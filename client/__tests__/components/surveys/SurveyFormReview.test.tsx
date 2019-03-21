import 'jest';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import {
  SurveyFormReview,
  mapStateToProps,
  mapDispatchToProps
} from '../../../src/components/surveys/SurveyFormReview';

const props = {
  formValues: [{ name: 'n1', label: 'l1' }],
  onCancel: jest.fn(),
  submitSurvey: jest.fn(),
  history: {} as History
};
const component = shallow(<SurveyFormReview {...props} />);

test('matches snapshot', () => {
  expect(toJSON(component)).toMatchSnapshot();
});

test('clicking Back button calls props.onCancel', () => {
  component
    .find('button')
    .at(0)
    .simulate('click');

  expect(props.onCancel).toHaveBeenCalled();
  expect(props.onCancel).toHaveBeenCalledTimes(1);
});

test('clicking Send Survey button calls props.submitSurvey', () => {
  component
    .find('button')
    .at(1)
    .simulate('click');

  expect(props.submitSurvey).toHaveBeenCalled();
  expect(props.submitSurvey).toHaveBeenCalledTimes(1);
  expect(props.submitSurvey).toHaveBeenCalledWith(
    props.formValues,
    props.history
  );
});

test('maps form value from store to props', () => {
  const props = mapStateToProps({
    auth: false,
    surveys: [],
    form: { surveyForm: { registeredFields: [] } }
  });

  expect(props).toEqual({ formFields: undefined });
});

test('dispatches handleToken from store to props', () => {
  const props = mapDispatchToProps(jest.fn());

  expect(Object.keys(props)[0]).toBe('submitSurvey');
});
