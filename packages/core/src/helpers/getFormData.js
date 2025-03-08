import { isFormField } from './isFormField.js';

export const getFormData = (doc) => {
  const formData = new Map();

  const types = {
    input: (node) => node.attrs.value || '',
    textarea: (node) => node.attrs.value || '',
    select: (node) => node.attrs.selected || '',
    checkbox: (node) => node.attrs.checked || false,
    default: (node) => node.attrs.value || '',
  };

  doc.descendants((node) => {
    if (isFormField(node) && node.attrs.name) {
      const valueGetter = types[node.attrs.fieldType] ?? types.default;
      const fieldValue = valueGetter(node);
      
      formData.set(node.attrs.name, {
        key: node.attrs.name,
        value: fieldValue,
        node,
      });
    }
  });
  
  return formData;
};
