import { Node, mergeAttributes } from '@kameo/core';
import { FormSubmitView } from './view/FormSubmitView.js';
import { createFieldSettings } from './settings/index.js';

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

  addStorage() {
    return {
      settings: Object.freeze({ ...createFieldSettings() }),
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('data-id'),
        renderHTML: (attrs) => {
          if (attrs.id == null) return {};
          return { 'data-id': attrs.id };
        },
      },
      label: {
        default: 'Submit',
        parseHTML: (elem) => elem.getAttribute('data-label'),
        renderHTML: (attrs) => {
          if (!attrs.label) return {};
          return {
            'data-label': attrs.label,
          };
        },
      },
      loading: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('loading') 
            && elem.getAttribute('loading') !== 'false'
        ),
      },
      disabled: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('disabled') 
            && elem.getAttribute('disabled') !== 'false'
        ),
      },
      variant: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('variant'),
      },
      appearance: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('appearance'),
      },
      size: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('size'),
      },
      pill: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('pill') 
            && elem.getAttribute('pill') !== 'false'
        ),
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
      insertFormSubmit: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormElement(this.name, pos, attrs);
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
