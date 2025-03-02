import { isFormField } from './isFormField.js';

export const getFormData = (state) => {
  const formData = new Map();

  state.doc.descendants((node) => {
    if (!isFormField(node) || !node.attrs.name) {
      return;
    }

    formData.set(node.attrs.name, {
      name: node.attrs.name,
      value: node.attrs.value,
      attrs: node.attrs,
      node,
    });
  });

  return formData;
};
