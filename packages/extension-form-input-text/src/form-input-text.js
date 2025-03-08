import { Node, mergeAttributes } from '@kameo/core';
import { FormInputTextView } from './view/FormInputTextView.js';

// TODO: create BaseFormField and extend it.
export const FormInputText = Node.create({
  name: 'formInputText',

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
        parseHTML: (elem) => {
          if (elem.getAttribute('required') === 'false') {
            return false;
          }
          return elem.hasAttribute('required');
        },
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
