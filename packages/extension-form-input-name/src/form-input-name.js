import { Node, mergeAttributes } from '@kameo/core';
import { FormInputBase } from '@kameo/form-input-base';
import { FormInputNameView } from './view/FormInputNameView.js';

export const FormInputName = FormInputBase.extend({
  name: 'formInputName',

  group: 'formField block',

  atom: true,

  draggable: true,

  selectable: true,
  
  addOptions() {
    return {
      HTMLAttributes: {
        type: 'text',
      },
      tagName: 'wa-input',
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),

      name: {
        default: 'name',
        parseHTML: (elem) => elem.getAttribute('name'),
      },
      label: {
        default: 'Enter your full name',
        parseHTML: (elem) => elem.getAttribute('label'),
      },
      placeholder: {
        default: 'Enter full name',
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
      insertFormInputName: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormElement(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    return (props) => {
      return new FormInputNameView({
        ...props,
        tagName: this.options.tagName,
      }, this.options);
    };
  },
});
