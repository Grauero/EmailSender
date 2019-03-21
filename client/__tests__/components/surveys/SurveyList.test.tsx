import 'jest';
import React from 'react';
import { shallow } from 'enzyme';

import {
  SurveyList,
  mapStateToProps,
  mapDispatchToProps
} from '../../../src/components/surveys/SurveyList';

const props = {
  fetchSurveys: jest.fn(),
  deleteSurvey: jest.fn(),
  surveys: [
    { _id: 'id', title: 'title', body: 'body', dateSent: '', yes: 0, no: 0 }
  ]
};
const component = shallow(<SurveyList {...props} />);

test('calls props.fetchSurveys when component mounts', () => {
  expect(props.fetchSurveys).toHaveBeenCalled();
});

test('renders props.surveys', () => {
  expect(component.find('.card').length).toBe(1);
  expect(component.find('.card-content').length).toBe(1);
  expect(component.find('.card-action').length).toBe(1);
});

test('calls props.deleteSurvey, props.fetchSurveys by clicking close icon', () => {
  component.find('i').simulate('click');

  expect(props.deleteSurvey).toHaveBeenCalled();
  expect(props.deleteSurvey).toHaveBeenCalledTimes(1);
  expect(props.deleteSurvey).toHaveBeenCalledWith(props.surveys[0]._id);

  expect(props.fetchSurveys).toHaveBeenCalled();
});

test('maps form value from store to props', () => {
  const props = mapStateToProps({
    auth: false,
    surveys: [{ id: 1 }],
    form: {}
  });

  expect(props).toEqual({ surveys: [{ id: 1 }] });
});

test('dispatches handleToken from store to props', () => {
  const props = mapDispatchToProps(jest.fn());

  expect(Object.keys(props)[0]).toBe('fetchSurveys');
  expect(Object.keys(props)[1]).toBe('deleteSurvey');
});
