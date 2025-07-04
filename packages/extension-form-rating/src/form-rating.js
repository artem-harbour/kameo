import { Node, mergeAttributes } from '@kameo/core';
import { FormRatingView } from './view/FormRatingView.js';
import { createFieldSettings } from './settings/index.js';

export const FormRating = Node.create({
  name: 'formRating',

  group: 'formField block',

  atom: true,

  draggable: true,

  selectable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      tagName: 'wa-rating',
      valueAttribute: {
        name: 'value',
        type: 'number',
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
        default: '',
        parseHTML: (elem) => elem.getAttribute('name'),
      },
      label: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('label'),
      },
      value: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('value'),
      },
      max: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('max'),
      },
      precision: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('precision'),
      },
      readonly: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('readonly') 
            && elem.getAttribute('readonly') !== 'false'
        ),
      },
      disabled: { 
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('disabled') 
            && elem.getAttribute('disabled') !== 'false'
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
      insertFormRating: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormElement(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    const options = {
      HTMLAttributes: this.options.HTMLAttributes,
    };

    return (props) => {
      return new FormRatingView({
        ...props,
        tagName: this.options.tagName,
      }, options);
    };
  },
});
