import { getAllFormFields } from './getAllFormFields.js';

export function findFormFields(predicate, state) {
  const allFormFields = getAllFormFields(state);
  const formFields = [];

  allFormFields.forEach((field) => {
    if (predicate(field.node)) {
      formFields.push(field);
    }
  });
  
  return formFields;
}
