import 'jest';
import React from 'react';
import { shallow } from 'enzyme';
import { InjectedFormProps } from 'redux-form';

import { SurveyNew } from '../../../src/components/surveys/SurveyNew';

const props = {} as InjectedFormProps;
const component = shallow(<SurveyNew {...props} />);

test('renders <SurveyForm /> component if state.showFormReview === false and pass onSurveySubmit as prop', () => {
  component.setState({ showFormReview: false });

  expect(component.find('ReduxForm').debug()).toContain(
    '<ReduxForm onSurveySubmit={[Function: onSurveySubmit]} />'
  );
});

test('onSurveySubmit sets state.showFormReview to true', () => {
  const initialState = { showFormReview: false };
  const expectedState = { showFormReview: true };

  component.setState(initialState);
  const element = component.find('ReduxForm').getElement();
  element.props.onSurveySubmit();

  expect(component.state()).toEqual(expectedState);
});

test('renders <SurveyFormReview /> component if state.showFormReview === true and pass onCancel as prop', () => {
  component.setState({ showFormReview: true });

  expect(component.find('.container').debug()).toContain(
    '<[object Object] onCancel={[Function: onCancel]} />'
  );
});

test('onCancel sets state.showFormReview to false', () => {
  const initialState = { showFormReview: true };
  const expectedState = { showFormReview: false };

  component.setState(initialState);
  const element = component
    .find('.container')
    .childAt(0)
    .getElement();
  element.props.onCancel();

  expect(component.state()).toEqual(expectedState);
});
