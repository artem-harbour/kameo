import { Node } from '@kameo/core';

export const FormInputBase = Node.create({
  name: 'formInputBase',

  addAttributes() {
    return {
      // Main attributes.
      id: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('data-id'),
        renderHTML: (attrs) => {
          if (attrs.id == null) return {};
          return {
            'data-id': attrs.id,
          };
        },
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
        default: null,
        parseHTML: (elem) => elem.getAttribute('label'),
      },
      hint: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('hint'),
      },
      placeholder: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('placeholder'),
      },
      readonly: {
        default: false,
        parseHTML: (elem) => elem.hasAttribute('readonly'),
      },
      required: {
        default: false,
        parseHTML: (elem) => elem.hasAttribute('required'),
      },
      disabled: {
        default: false,
        parseHTML: (elem) => elem.hasAttribute('disabled'),
      },

      // Additional attributes.
      size: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('size'),
      },
      appearance: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('appearance'),
      },
      pill: {
        default: false,
        parseHTML: (elem) => elem.hasAttribute('pill'),
      },
      clearable: {
        default: false,
        parseHTML: (elem) => elem.hasAttribute('pill'),
      },
      pattern: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('pattern'),
      },
      minlength: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('minlength'),
      },
      maxlength: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('maxlength'),
      },
      autocapitalize: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('autocapitalize'),
      },
      autocorrect: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('autocorrect'),
      },
      autocomplete: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('autocomplete'),
      },
      autofocus: {
        default: false,
        parseHTML: (elem) => elem.hasAttribute('autocomplete'),
      },
      enterkeyhint: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('enterkeyhint'),
      },
      spellcheck: {
        default: false,
        parseHTML: (elem) => elem.hasAttribute('spellcheck'),
      },
      inputmode: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('inputmode'),
      },

      // Custom attributes.
      fieldType: {
        default: 'input',
        rendered: false,
      },

      /* 
      Only applies to password input types.
      'password-toggle': {
        default: false,
        parseHTML: (elem) => elem.hasAttribute('password-toggle'),
      },
      'password-visible': {
        default: false,
        parseHTML: (elem) => elem.hasAttribute('password-visible'),
      },

      Only applies to number input types.
      'no-spin-buttons': {
        default: false,
        parseHTML: (elem) => elem.hasAttribute('no-spin-buttons'),
      },

      Only applies to date and number input types.
      min: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('min'),
      },
      max: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('max'),
      }, 
      step: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('step'),
      }, 
      */
    };
  },
});
