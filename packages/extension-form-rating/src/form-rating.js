import { Node, mergeAttributes } from '@kameo/core';
import { FormRatingView } from './view/FormRatingView.js';

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
    };
  },
  
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('id'),
      },

      name: {
        default: 'rating',
        parseHTML: (elem) => elem.getAttribute('name'),
      },

      label: {
        default: '',
        parseHTML: (elem) => elem.getAttribute('label'),
      },

      value: {
        default: 0,
        parseHTML: (elem) => elem.getAttribute('value'),
      },

      max: {
        default: 5,
        parseHTML: (elem) => elem.getAttribute('max'),
      },

      precision: {
        default: 1,
        parseHTML: (elem) => elem.getAttribute('precision'),
      },

      readonly: {
        default: false,
        parseHTML: (elem) => elem.hasAttribute('readonly'),
      },

      disabled: { 
        default: false,
        parseHTML: (elem) => elem.hasAttribute('disabled'),
      },

      fieldType: {
        default: '',
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
        return commands.insertFormField(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    return (props) => {
      return new FormRatingView({
        ...props,
        tagName: this.options.tagName,
      });
    };
  },
});
