import { Node, mergeAttributes } from '@kameo/core';
import { FormInputBase } from '@kameo/extension-form-input-base';
import { FormInputAddressView } from './view/FormInputAddressView.js';

export const FormInputAddress = FormInputBase.extend({
  name: 'formInputAddress',

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
        default: 'address',
        parseHTML: (elem) => elem.getAttribute('name'),
      },

      label: {
        default: 'Enter your full address',
        parseHTML: (elem) => elem.getAttribute('label'),
      },

      placeholder: {
        default: 'Enter full address',
        parseHTML: (elem) => elem.getAttribute('placeholder'),
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
      insertFormInputAddress: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormField(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    return (props) => {
      return new FormInputAddressView({
        ...props,
        tagName: this.options.tagName,
      });
    };
  },
});
