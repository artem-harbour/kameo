import { Node, mergeAttributes } from '@kameo/core';
import { FormSliderView } from './view/FormSliderView.js';

export const FormSlider = Node.create({
  name: 'formSlider',

  group: 'formField block',

  atom: true,

  draggable: true,

  selectable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      tagName: 'wa-slider',
    };
  },
  
  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('id'),
      },
      name: {
        default: 'slider',
        parseHTML: (elem) => elem.getAttribute('name'),
      },
      label: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('label'),
      },
      hint: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('hint'),
      },
      value: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('value'),
      },
      disabled: { 
        default: false,
        parseHTML: (elem) => elem.hasAttribute('disabled'),
      },
      min: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('min'),
      },
      max: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('max'),
      }, 
      step: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('step'),
      },
      tooltip: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('tooltip'),
      },
      fieldType: {
        default: 'custom',
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
      insertFormSlider: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormElement(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    return (props) => {
      return new FormSliderView({
        ...props,
        tagName: this.options.tagName,
      });
    };
  },
});
