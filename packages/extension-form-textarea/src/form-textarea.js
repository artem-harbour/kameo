import { Node, mergeAttributes } from '@kameo/core';
import { FormTextareaView } from './view/FormTextareaView.js';

export const FormTextarea = Node.create({
  name: 'formTextarea',

  group: 'formField block',

  atom: true,

  draggable: true,

  selectable: true,
  
  addOptions() {
    return {
      HTMLAttributes: {},
      tagName: 'wa-textarea',
    };
  },

  addAttributes() {
    return {
      // Main attributes.
      id: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('id'),
      },
      name: {
        default: 'textarea',
        parseHTML: (elem) => elem.getAttribute('name'),
      },
      value: {
        default: '',
        parseHTML: (elem) => elem.getAttribute('value'),
      },
      label: {
        default: 'Enter your info',
        parseHTML: (elem) => elem.getAttribute('label'),
      },
      hint: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('hint'),
      },
      placeholder: {
        default: 'Enter info',
        parseHTML: (elem) => elem.getAttribute('placeholder'),
      },
      rows: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('rows'),
      },
      resize: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('resize'),
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
      fieldType: {
        default: 'textarea',
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
      insertFormTextarea: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormField(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    return (props) => {
      return new FormTextareaView({ 
        ...props,
        tagName: this.options.tagName,
      }, this.options);
    };
  },
});
