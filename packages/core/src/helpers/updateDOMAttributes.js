const defaultBooleans = [
  'required',
  'readonly',
  'disabled',
  'checked',
  'multiple',
  'autofocus',
];

export const updateDOMAttributes = (dom, attrs = {}, {
  customBooleans = [],
} = {}) => {
  const booleans = [...defaultBooleans, ...customBooleans];

  Object.entries(attrs).forEach(([key, value]) => {
    if (booleans.includes(key)) {
      if (!value) dom.removeAttribute(key);
      else dom.setAttribute(key, '');
      return;
    }
    
    if (value != null && value !== '') {
      dom.setAttribute(key, value);
    } else {
      dom.removeAttribute(key);
    }
  });
};
