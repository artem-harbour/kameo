import { Node, mergeAttributes } from '@kameo/core';
import { FormInputTextView } from './view/FormInputTextView.js';

// TODO: create BaseFormField and extend it.

export const FormInputText = Node.create({
  name: 'formInputText',

  group: 'formField block',

  atom: true,

  draggable: false, // ?

  selectable: true, // ?

  addOptions() {
    return {
      HTMLAttributes: {
        class: 'km-form-field',
      },
      tagName: 'wa-input',
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

      type: {
        default: 'text',
      },
    };
  },

  parseHTML() {
    return [{
      tag: this.options.tagName, 
      getAttrs(node) {
        let type = node.getAttribute('type');

        if (type !== 'text' && type !== null) {
          return false;
        }

        return null;
      },
    }];
  },

  renderHTML({ HTMLAttributes }) {
    return [this.options.tagName, mergeAttributes(this.options.HTMLAttributes, HTMLAttributes)];
  },

  addCommands() {
    return {
      insertFormInputText: (pos, attrs = {}) => ({
        dispatch,
        tr,
        commands,
      }) => {
        if (dispatch) {
          let posMapped = tr.mapping.map(pos);

          return commands.insertContentAt(posMapped, {
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
