import { Node, mergeAttributes } from '@kameo/core';
import { FormInputBase } from '@kameo/extension-form-input-base';
import { FormInputJobTitleView } from './view/FormInputJobTitleView.js';

export const FormInputJobTitle = FormInputBase.extend({
  name: 'formInputJobTitle',

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

      label: {
        default: 'Enter your job title',
        parseHTML: (elem) => elem.getAttribute('label'),
      },

      placeholder: {
        default: 'Enter job title',
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
      insertFormInputJobTitle: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormField(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    return (props) => {
      return new FormInputJobTitleView({
        ...props,
        tagName: this.options.tagName,
      });
    };
  },
});
