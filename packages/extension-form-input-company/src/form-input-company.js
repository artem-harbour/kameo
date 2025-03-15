import { Node, mergeAttributes } from '@kameo/core';
import { FormInputBase } from '@kameo/extension-form-input-base';
import { FormInputCompanyView } from './view/FormInputCompanyView.js';

export const FormInputCompany = FormInputBase.extend({
  name: 'formInputCompany',

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
        default: 'company',
        parseHTML: (elem) => elem.getAttribute('name'),
      },

      label: {
        default: 'Enter company name',
        parseHTML: (elem) => elem.getAttribute('label'),
      },

      placeholder: {
        default: 'Enter company',
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
      insertFormInputCompany: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormField(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    return (props) => {
      return new FormInputCompanyView({
        ...props,
        tagName: this.options.tagName,
      });
    };
  },
});
