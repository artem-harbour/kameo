import { Node, mergeAttributes } from '@kameo/core';
import { FormInputBase, settings } from '@kameo/form-input-base';
import { FormInputDateView } from './view/FormInputDateView.js';

export const FormInputDate = FormInputBase.extend({
  name: 'formInputDate',

  group: 'formField block',

  atom: true,

  draggable: true,

  selectable: true,
  
  addOptions() {
    return {
      HTMLAttributes: {
        type: 'date',
      },
      tagName: 'wa-input',
    };
  },

  addStorage() {
    const newSettings = { ...settings };
    newSettings.value = { ...newSettings.value, inputType: 'date' };
    
    return {
      settings: Object.freeze({ ...newSettings }),
    };
  },

  addAttributes() {
    return {
      ...this.parent?.(),

      name: {
        default: 'date',
        parseHTML: (elem) => elem.getAttribute('name'),
      },
      label: {
        default: 'Select date',
        parseHTML: (elem) => elem.getAttribute('label'),
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
      insertFormInputDate: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormElement(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    return (props) => {
      return new FormInputDateView({ 
        ...props,
        tagName: this.options.tagName,
      }, this.options);
    };
  },
});
