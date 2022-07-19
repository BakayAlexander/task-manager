export const BASE_URL = 'https://uxcandy.com/~shapoval/test-task-backend/v2/';
export const BASE_DEVELOPER = '?developer=BakayAlexander';

export const selectOptions = [
  { value: 0, label: 'Not completed. Not edited.' },
  { value: 1, label: 'Not completed. Edited.' },
  { value: 10, label: 'Completed. Not edited.' },
  { value: 11, label: 'Completed. Edited.' },
];

export const REG_EXP_EMAIL =
  // eslint-disable-next-line no-useless-escape
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
