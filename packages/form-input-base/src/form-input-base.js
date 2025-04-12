import { Node } from '@kameo/core';

export const FormInputBase = Node.create({
  name: 'formInputBase',

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('id'),
      },

      type: {
        default: 'text',
        parseHTML: (elem) => elem.getAttribute('type') || 'text',
      },

      name: {
        default: '',
        parseHTML: (elem) => elem.getAttribute('name'),
      },
      
      value: {
        default: '',
        parseHTML: (elem) => elem.getAttribute('value'),
      },

      label: {
        default: '',
        parseHTML: (elem) => elem.getAttribute('label'),
      },

      placeholder: {
        default: '',
        parseHTML: (elem) => elem.getAttribute('placeholder'),
      },

      required: {
        default: false,
        parseHTML: (elem) => {
          if (elem.getAttribute('required') === 'false') {
            return false;
          }
          return elem.hasAttribute('required');
        },
      },
    };
  },
});
