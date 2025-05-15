import { Node, mergeAttributes } from '@kameo/core';
import { FormInputBase, createSettings } from '@kameo/form-input-base';
import { FormInputTimeView } from './view/FormInputTimeView.js';

export const FormInputTime = FormInputBase.extend({
  name: 'formInputTime',

  group: 'formField block',

  atom: true,

  draggable: true,

  selectable: true,
  
  addOptions() {
    return {
      HTMLAttributes: {
        type: 'time',
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
        default: 'time',
        parseHTML: (elem) => elem.getAttribute('name'),
      },
      label: {
        default: 'Select time',
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
      insertFormInputTime: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormElement(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    return (props) => {
      return new FormInputTimeView({ 
        ...props,
        tagName: this.options.tagName,
      }, this.options);
    };
  },
});
