import { Node, mergeAttributes } from '@kameo/core';
import { FormInputBase } from '@kameo/form-input-base';
import { FormInputEmailView } from './view/FormInputEmailView.js';

export const FormInputEmail = FormInputBase.extend({
  name: 'formInputEmail',

  group: 'formField block',

  atom: true,

  draggable: true,

  selectable: true,
  
  addOptions() {
    return {
      HTMLAttributes: {},
      tagName: 'wa-input',
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),

      name: {
        default: 'email',
        parseHTML: (elem) => elem.getAttribute('name'),
      },

      label: {
        default: 'Enter your email',
        parseHTML: (elem) => elem.getAttribute('label'),
      },

      placeholder: {
        default: 'Enter email',
        parseHTML: (elem) => elem.getAttribute('placeholder'),
      },

      type: {
        default: 'email',
        parseHTML: (elem) => elem.getAttribute('type') || 'email',
      },
      
      fieldType: {
        default: 'input',
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
      insertFormInputEmail: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormField(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    return (props) => {
      return new FormInputEmailView({
        ...props,
        tagName: this.options.tagName,
      });
    };
  },
});
