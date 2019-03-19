import validateEmails from '../../../src/components/utils/validateEmails';

test('sets emails as empty string if emails are not provided', () => {
  expect(validateEmails(undefined)).toBeNull();
});

test('returns NULL if provided emails are valid', () => {
  expect(validateEmails('1@gmail.com, 2@gmail.com')).toBeNull();
  expect(validateEmails('1@gmail.com, 2@gmail.com,')).toBeNull();
  expect(validateEmails(',1@gmail.com, 2@gmail.com')).toBeNull();
});

test('returns error message if emails are not valid', () => {
  expect(validateEmails('1gmail.com')).toContain('These emails are invalid');
  expect(validateEmails('1gmail.com, 2@gmail.com')).toContain(
    'These emails are invalid'
  );
  expect(validateEmails('1gmail.com, 2gmail.com')).toContain(
    'These emails are invalid'
  );
});
