const booleans = [
  'required',
  'readonly',
  'disabled',
  'checked',
  'multiple',
  'autofocus',
];

export const updateDOMAttributes = (dom, attrs = {}) => {
  Object.entries(attrs).forEach(([key, value]) => {
    if (booleans.includes(key)) {
      if (!value) dom.removeAttribute(key);
      else dom.setAttribute(key, '');
      return;
    }
    
    dom.setAttribute(key, value);
  });
};
