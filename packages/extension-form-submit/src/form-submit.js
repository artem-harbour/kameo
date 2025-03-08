import { Node, mergeAttributes } from '@kameo/core';
import { FormSubmitView } from './view/FormSubmitView.js';

export const FormSubmit = Node.create({
  name: 'formSubmit',

  group: 'formElement block',

  atom: true,

  draggable: true,

  selectable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      tagName: 'wa-button',
      submitProps: {},
      disableOnSubmit: true,
      handleClick: null,
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('id'),
      },

      text: {
        default: 'Submit',
        parseHTML: (elem) => elem.getAttribute('data-text'),
      },

      loading: {
        default: false,
        parseHTML: (elem) => elem.hasAttribute('loading'),
      },

      disabled: {
        default: false,
        parseHTML: (elem) => elem.hasAttribute('disabled'),
      },
      
      variant: {
        default: 'brand',
        parseHTML: (elem) => elem.getAttribute('variant'),
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
      insertFormSubmit: (pos, attrs = {}) => ({
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
      const options = {
        submitProps: this.options.submitProps,
        disableOnSubmit: this.options.disableOnSubmit,
        handleClick: this.options.handleClick,
      };

      return new FormSubmitView({
        ...props,
        tagName: this.options.tagName,
      }, options);
    };
  },
});
