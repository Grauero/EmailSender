import 'jest';
import React from 'react';
import { shallow } from 'enzyme';
import toJSON from 'enzyme-to-json';

import {
  renderFields,
  validate,
  SurveyForm,
  ISurveyForm
} from '../../../src/components/surveys/SurveyForm';
import { formFields } from '../../../src/components/surveys/formFields';
import { InjectedFormProps } from 'redux-form';

const props = ({
  onSurveySubmit: jest.fn(),
  handleSubmit: jest.fn()
} as unknown) as ISurveyForm & InjectedFormProps;
const component = shallow(<SurveyForm {...props} />);

test('renderFields function returns correct number of <Field> components', () => {
  const zeroItems = [];
  const oneItem = [{ label: 'l1', name: 'n1' }];
  const twoItems = [{ label: 'l1', name: 'n1' }, { label: 'l2', name: 'n2' }];

  expect(renderFields(zeroItems)).toMatchSnapshot();
  expect(renderFields(oneItem)).toMatchSnapshot();
  expect(renderFields(twoItems)).toMatchSnapshot();
});

test('validate function validates provided data and returns NULL if data is valid', () => {
  const values = {
    recipients: '1@gmail.com',
    title: 'title',
    body: 'body',
    subject: 'subject'
  };

  expect(validate(values, formFields)).toEqual({ recipients: null });
});

test('validate function validates provided data and return error object if data is invalid', () => {
  const values = {};

  expect(validate(values, formFields)).toEqual({
    body: 'You must provide a value',
    recipients: 'You must provide a value',
    subject: 'You must provide a value',
    title: 'You must provide a value'
  });
});

test('matches snapshot', () => {
  expect(toJSON(component)).toMatchSnapshot();
});
