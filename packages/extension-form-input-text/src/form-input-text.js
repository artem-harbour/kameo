import { Node, mergeAttributes } from '@kameo/core';

export const FormInputText = Node.create({
  name: 'formInputText',

  group: 'formField',

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  addAttributes() {
    return {};
  },

  parseHTML() {

  },

  renderHTML() {

  },

  addCommands() {
    return {};
  },

  addNodeView() {
  
  },
});
