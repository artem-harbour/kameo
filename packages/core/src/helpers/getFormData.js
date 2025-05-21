import { isFormField } from './isFormField.js';

export const getFormData = (doc) => {
  const formData = {};

  const types = {
    input: (node) => node.attrs.value ?? '',
    textarea: (node) => node.attrs.value ?? '',
    select: (node) => node.attrs.value ?? '',
    checkbox: (node) => node.attrs.checked ?? false,
    default: (node) => node.attrs.value ?? '',
  };

  doc.descendants((node) => {
    if (isFormField(node) && node.attrs.name) {
      const valueGetter = types[node.attrs.fieldType] ?? types.default;
      const fieldValue = valueGetter(node);

      formData[node.attrs.name] = {
        name: node.attrs.name,
        value: fieldValue,
        node,
      };
    }
  });
  
  return formData;
};
