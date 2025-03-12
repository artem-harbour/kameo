import { Node, mergeAttributes } from '@kameo/core';
import { FormFieldBase } from '@kameo/extension-form-field-base';
import { FormInputEmailView } from './view/FormInputEmailView.js';

export const FormInputEmail = FormFieldBase.extend({
  name: 'formInputEmail',

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

      type: {
        default: 'email',
        parseHTML: (elem) => elem.getAttribute('type') || 'email',
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
      insertFormInputEmail: (pos, attrs = {}) => ({
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
      return new FormInputEmailView({
        ...props,
        tagName: this.options.tagName,
      });
    };
  },
});
