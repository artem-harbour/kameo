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
        parseHTML: (elem) => (
          elem.hasAttribute('readonly') 
            && elem.getAttribute('readonly') !== 'false'
        ),
      },
      disabled: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('disabled') 
            && elem.getAttribute('disabled') !== 'false'
        ),
      },
      required: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('required') 
            && elem.getAttribute('required') !== 'false'
        ),
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
        parseHTML: (elem) => (
          elem.hasAttribute('pill') && 
            elem.getAttribute('pill') !== 'false'
        ),
      },
      clearable: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('clearable') 
            && elem.getAttribute('clearable') !== 'false'
        ),
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
        parseHTML: (elem) => {
          const attr = elem.getAttribute('autofocus');
          return !!attr && attr !== 'false';
        },
      },
      enterkeyhint: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('enterkeyhint'),
      },
      spellcheck: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('spellcheck') 
            && elem.getAttribute('spellcheck') !== 'false'
        ),
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

      /** 
      // Only applies to password input types.
      'password-toggle': {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('password-toggle') 
            && elem.getAttribute('password-toggle') !== 'false'
        ),
      },
      'password-visible': {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('password-visible') 
            && elem.getAttribute('password-visible') !== 'false'
        ),
      },
      */
    };
  },
});
