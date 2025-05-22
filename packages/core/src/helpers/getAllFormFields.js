import { findChildren } from '@tiptap/core';
import { isFormField } from './isFormField.js';

export function getAllFormFields(state) {
  const formFields = findChildren(state.doc, (node) => isFormField(node));
  return formFields;
}
