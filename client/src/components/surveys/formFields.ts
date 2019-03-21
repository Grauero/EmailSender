export interface IFormField {
  label: string;
  name: string;
}

export const formFields: IFormField[] = [
  { label: 'Survey Title', name: 'title' },
  { label: 'Subject Line', name: 'subject' },
  { label: 'Email Body', name: 'body' },
  { label: 'Recipient List', name: 'recipients' }
];
