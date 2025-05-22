import { Node, mergeAttributes } from '@kameo/core';
import { FormCheckboxView } from './view/FormCheckboxView.js';
import { createFieldSettings } from './settings/index.js';

export const FormCheckbox = Node.create({
  name: 'formCheckbox',

  group: 'formField block',

  atom: true,

  draggable: true,

  selectable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      tagName: 'wa-checkbox',
      valueAttribute: {
        name: 'checked',
        type: 'boolean',
      },
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
      name: {
        default: 'checkbox',
        parseHTML: (elem) => elem.getAttribute('name'),
      },
      // to double check
      value: { 
        default: '',
        parseHTML: (elem) => elem.getAttribute('value'),
      },
      label: {
        default: 'Checkbox',
        parseHTML: (elem) => elem.getAttribute('data-label'),
        renderHTML: (attrs) => {
          if (!attrs.label) return {};
          return { 'data-label': attrs.label };
        },
      },
      hint: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('hint'),
      },
      checked: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('checked') 
            && elem.getAttribute('checked') !== 'false'
        ),
      },
      required: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('required') 
            && elem.getAttribute('required') !== 'false'
        ),
      },
      disabled: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('disabled') 
            && elem.getAttribute('disabled') !== 'false'
        ),
      },
      indeterminate: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('indeterminate') 
            && elem.getAttribute('indeterminate') !== 'false'
        ),
      },
      size: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('size'),
      },
      valueAttribute: {
        default: this.options.valueAttribute,
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
      insertFormCheckbox: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormElement(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    const options = {
      HTMLAttributes: this.options.HTMLAttributes,
    };

    return (props) => {
      return new FormCheckboxView({ 
        ...props,
        tagName: this.options.tagName,
      }, options);
    };
  },
});
