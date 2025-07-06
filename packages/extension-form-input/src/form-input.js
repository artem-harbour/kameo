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
      customValidator: null,
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
          return { 'data-id': attrs.id };
        },
      },
      type: {
        default: 'text', // text | email | number | date | time | tel | url
        parseHTML: (elem) => elem.getAttribute('type'),
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
      withClear: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('with-clear') 
            && elem.getAttribute('with-clear') !== 'false'
        ),
        renderHTML: (attrs) => {
          return { 'with-clear': !!attrs.withClear };
        },
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
        parseHTML: (elem) => (
          elem.hasAttribute('autofocus') 
            && elem.getAttribute('autofocus') !== 'false'
        ),
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
      withoutSpinButtons: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('without-spin-buttons') 
            && elem.getAttribute('without-spin-buttons') !== 'false'
        ),
        renderHTML: (attrs) => {
          return { 'without-spin-buttons': !!attrs.withoutSpinButtons };
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
        return commands.insertFormElement(this.name, pos, {
          name: 'text',
          ...attrs,
        });
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

      insertFormInputTel: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormInput(pos, {
          type: 'tel',
          name: 'tel',
          label: 'Enter telephone number',
          ...attrs,
        });
      },

      insertFormInputURL: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormInput(pos, {
          type: 'url',
          name: 'url',
          label: 'Enter url',
          ...attrs,
        });
      },
    };
  },

  addNodeView() {
    const options = {
      HTMLAttributes: this.options.HTMLAttributes,
      customBooleans: ['without-spin-buttons', 'with-clear', 'pill' , 'spellcheck'],
    };

    return (props) => {
      return new FormInputView({ 
        ...props,
        tagName: this.options.tagName,
      }, options);
    };
  },
});
