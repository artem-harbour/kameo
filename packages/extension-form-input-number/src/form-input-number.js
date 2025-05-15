import { Node, mergeAttributes } from '@kameo/core';
import { FormInputBase, createSettings } from '@kameo/form-input-base';
import { FormInputNumberView } from './view/FormInputNumberView.js';

export const FormInputNumber = FormInputBase.extend({
  name: 'formInputNumber',

  group: 'formField block',

  atom: true,

  draggable: true,

  selectable: true,
  
  addOptions() {
    return {
      HTMLAttributes: {
        type: 'number',
      },
      tagName: 'wa-input',
    };
  },

  addStorage() {
    return {
      settings: Object.freeze({ ...createSettings() }),
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),

      name: {
        default: 'number',
        parseHTML: (elem) => elem.getAttribute('name'),
      },
      label: {
        default: 'Enter number',
        parseHTML: (elem) => elem.getAttribute('label'),
      },
      placeholder: {
        default: 'Enter number',
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
      insertFormInputNumber: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormElement(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    return (props) => {
      return new FormInputNumberView({ 
        ...props,
        tagName: this.options.tagName,
      }, this.options);
    };
  },
});
