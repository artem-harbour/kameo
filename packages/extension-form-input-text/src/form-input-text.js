import { Node, mergeAttributes } from '@kameo/core';
import { FormInputBase } from '@kameo/form-input-base';
import { FormInputTextView } from './view/FormInputTextView.js';

export const FormInputText = FormInputBase.extend({
  name: 'formInputText',

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
        default: 'text',
        parseHTML: (elem) => elem.getAttribute('name'),
      },

      label: {
        default: 'Enter your info',
        parseHTML: (elem) => elem.getAttribute('label'),
      },

      placeholder: {
        default: 'Enter info',
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
      insertFormInputText: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormField(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    return (props) => {
      return new FormInputTextView({ 
        ...props,
        tagName: this.options.tagName,
      }, this.options);
    };
  },
});
