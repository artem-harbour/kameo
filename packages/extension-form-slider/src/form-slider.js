import { Node, mergeAttributes } from '@kameo/core';
import { FormSliderView } from './view/FormSliderView.js';
import { createFieldSettings } from './settings/index.js';

// TODO: update.
// https://webawesome.com/docs/components/slider/

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
        parseHTML: (elem) => (
          elem.hasAttribute('disabled') 
            && elem.getAttribute('disabled') !== 'false'
        ),
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
      insertFormSlider: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormElement(this.name, pos, attrs);
      },
    };
  },

  addNodeView() {
    const options = {
      HTMLAttributes: this.options.HTMLAttributes,
    };

    return (props) => {
      return new FormSliderView({
        ...props,
        tagName: this.options.tagName,
      }, options);
    };
  },
});
