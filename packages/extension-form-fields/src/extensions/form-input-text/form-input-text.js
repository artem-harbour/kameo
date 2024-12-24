import { Node, mergeAttributes } from '@kameo/core';
import { FormInputTextView } from './view/FormInputTextView.js';

export const FormInputText = Node.create({
  name: 'formInputText',

  group: 'formField block',

  atom: true,

  draggable: false, // ?

  selectable: false, // ?

  addOptions() {
    return {
      HTMLAttributes: {},
      tagName: 'k-form-input-text',
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('id'),
      },

      name: {
        default: '',
        parseHTML: (elem) => elem.getAttribute('name'),
      },

      value: {
        default: '',
        parseHTML: (elem) => elem.getAttribute('value'),
      },

      label: {
        default: '',
        parseHTML: (elem) => elem.getAttribute('label'),
      },

      placeholder: {
        default: '',
        parseHTML: (elem) => elem.getAttribute('placeholder'),
      },

      required: {
        default: false,
        parseHTML: (elem) => elem.hasAttribute('required'),
      },
    };
  },

  parseHTML() {
    return [{ tag: this.options.tagName }];
  },

  renderHTML({ HTMLAttributes }) {
    return [this.options.tagName, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  // TODO: add update, delete commands, etc
  addCommands() {
    return {
      insertFormInputText: (pos, attrs = {}) => ({
        dispatch,
        tr,
        commands,
      }) => {
        if (dispatch) {
          let posMap = tr.mapping.map(pos);

          return commands.insertContentAt(posMap, {
            type: this.name,
            attrs,
          }, { updateSelection: false });
        }

        return true;
      },
    };
  },

  addNodeView() {
    return (props) => {
      return new FormInputTextView({
        ...props,
        tagName: this.options.tagName,
      });
    };
  },
});
