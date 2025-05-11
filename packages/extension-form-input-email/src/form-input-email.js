import { Node, mergeAttributes } from '@kameo/core';
import { FormInputBase, settings } from '@kameo/form-input-base';
import { FormInputEmailView } from './view/FormInputEmailView.js';

export const FormInputEmail = FormInputBase.extend({
  name: 'formInputEmail',

  group: 'formField block',

  atom: true,

  draggable: true,

  selectable: true,
  
  addOptions() {
    return {
      HTMLAttributes: {
        type: 'email',
      },
      tagName: 'wa-input',
    };
  },

  addStorage() {
    const newSettings = { ...settings };
    newSettings.value = { ...newSettings.value, inputType: 'email' };
    
    return {
      settings: Object.freeze({ ...newSettings }),
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
        return commands.insertFormElement(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    return (props) => {
      return new FormInputEmailView({
        ...props,
        tagName: this.options.tagName,
      }, this.options);
    };
  },
});
