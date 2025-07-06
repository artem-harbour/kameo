import { Node, mergeAttributes } from '@kameo/core';
import { FormSwitchView } from './view/FormSwitchView.js';
import { createFieldSettings } from './settings/index.js';

export const FormSwitch = Node.create({
  name: 'formSwitch',

  group: 'formField block',

  atom: true,

  draggable: true,

  selectable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      tagName: 'wa-switch',
      valueAttribute: {
        name: 'checked',
        type: 'boolean',
      },
      customValidator: null,
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
          return { 'data-id': attrs.id };
        },
      },
      name: {
        default: '',
        parseHTML: (elem) => elem.getAttribute('name'),
      },
      label: {
        default: 'Switch',
        parseHTML: (elem) => elem.getAttribute('data-label'),
        renderHTML: (attrs) => {
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
      disabled: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('disabled') 
            && elem.getAttribute('disabled') !== 'false'
        ),
      },
      required: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('required') 
            && elem.getAttribute('required') !== 'false'
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
      insertFormSwitch: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormElement(this.name, pos, {
          name: 'switch',
          ...attrs,
        });
      },
    };
  },

  addNodeView() {
    const options = {
      HTMLAttributes: this.options.HTMLAttributes,
    };

    return (props) => {
      return new FormSwitchView({ 
        ...props,
        tagName: this.options.tagName,
      }, options);
    };
  },
});
