import { isFormField } from './isFormField.js';

export function getFormData(doc) {
  const formData = {};

  const types = {
    string: (node, name) => node.attrs[name] ?? '',
    number: (node, name) => node.attrs[name] ?? '',
    boolean: (node, name) => node.attrs[name] ?? false,
    default: (node, name) => node.attrs[name] ?? '',
  };

  doc.descendants((node) => {
    if (isFormField(node) && node.attrs.name) {
      const { valueAttribute } = node.attrs;

      const valueName = valueAttribute?.name ?? 'value';
      const valueType = valueAttribute?.type ?? 'string';

      const valueGetter = types[valueType] ?? types.default;
      const value = valueGetter(node, valueName);

      formData[node.attrs.name] = {
        name: node.attrs.name,
        value,
        node,
      };
    }
  });
  
  return formData;
};
