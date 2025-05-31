import { Node, mergeAttributes } from '@kameo/core';
import { FormInputView } from './view/FormInputView.js';
import { createFieldSettings } from './settings/index.js';

export const FormInput = Node.create({
  name: 'formInput',

  group: 'formField block',

  atom: true,

  draggable: true,

  selectable: true,
  
  addOptions() {
    return {
      HTMLAttributes: {},
      tagName: 'wa-input',
      valueAttribute: {
        name: 'value',
        type: 'string',
      },
    };
  },

  addStorage() {
    return {
      settings: Object.freeze({ ...createFieldSettings() }),
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('data-id'),
        renderHTML: (attrs) => {
          if (attrs.id == null) return {};
          return { 'data-id': attrs.id };
        },
      },
      type: {
        default: 'text', // text | email | number | date | time
        parseHTML: (elem) => elem.getAttribute('type'),
      },
      name: {
        default: 'input',
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

      // Only applies to number input types.
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
      noSpinButtons: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('no-spin-buttons') 
            && elem.getAttribute('no-spin-buttons') !== 'false'
        ),
        renderHTML: (attrs) => {
          if (!attrs.noSpinButtons) return {};
          return { 'no-spin-buttons': true };
        },
      },
      valueAttribute: {
        default: this.options.valueAttribute,
        rendered: false,
      },
    };
  },

  parseHTML() {
    return [{ tag: `${this.options.tagName}[data-type="${this.name}"]` }];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      this.options.tagName,
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        'data-type': this.name,
      }),
    ];
  },

  addCommands() {
    return {
      insertFormInput: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormElement(this.name, pos, attrs);
      },

      insertFormInputText: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormInput(pos, {
          type: 'text',
          name: 'text',
          label: 'Enter your info',
          placeholder: 'Enter info',
          ...attrs,
        });
      },

      insertFormInputName: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormInput(pos, {
          type: 'text',
          name: 'name',
          label: 'Enter your full name',
          placeholder: 'Enter full name',
          ...attrs,
        });
      },

      insertFormInputEmail: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormInput(pos, {
          type: 'email',
          name: 'email',
          label: 'Enter your email',
          placeholder: 'Enter email',
          ...attrs,
        });
      },

      insertFormInputNumber: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormInput(pos, {
          type: 'number',
          name: 'number',
          label: 'Enter number',
          placeholder: 'Enter number',
          ...attrs,
        });
      },

      insertFormInputDate: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormInput(pos, {
          type: 'date',
          name: 'date',
          label: 'Select date',
          ...attrs,
        });
      },

      insertFormInputTime: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormInput(pos, {
          type: 'time',
          name: 'time',
          label: 'Select time',
          ...attrs,
        });
      },
    };
  },

  addNodeView() {
    const options = {
      HTMLAttributes: this.options.HTMLAttributes,
    };

    return (props) => {
      return new FormInputView({ 
        ...props,
        tagName: this.options.tagName,
      }, options);
    };
  },
});
