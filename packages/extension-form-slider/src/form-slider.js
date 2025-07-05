import { Node, mergeAttributes } from '@kameo/core';
import { FormSliderView } from './view/FormSliderView.js';
import { createFieldSettings } from './settings/index.js';

// TODO: valueFormatter

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
        default: '',
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
      readonly: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('readonly') 
            && elem.getAttribute('readonly') !== 'false'
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
      range: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('range') 
            && elem.getAttribute('range') !== 'false'
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
      minValue: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('min-value'),
        renderHTML: (attrs) => {
          if (attrs.minValue == null) return {};
          return { 
            'min-value': attrs.minValue,
          };
        },
      },
      maxValue: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('max-value'),
        renderHTML: (attrs) => {
          if (attrs.maxValue == null) return {};
          return { 
            'max-value': attrs.maxValue,
          };
        },
      },
      step: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('step'),
      },
      size: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('size'),
      },
      orientation: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('orientation'),
      },
      withTooltip: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('with-tooltip') 
            && elem.getAttribute('with-tooltip') !== 'false'
        ),
        renderHTML: (attrs) => {
          if (!attrs.withTooltip) return {};
          return { 
            'with-tooltip': attrs.withTooltip,
          };
        },
      },
      withMarkers: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('with-markers') 
            && elem.getAttribute('with-markers') !== 'false'
        ),
        renderHTML: (attrs) => {
          if (!attrs.withMarkers) return {};
          return { 
            'with-markers': attrs.withMarkers,
          };
        },
      },
      tooltipPlacement: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('tooltip-placement'),
        renderHTML: (attrs) => {
          if (!attrs.tooltipPlacement) return {};
          return { 
            'tooltip-placement': attrs.tooltipPlacement,
          };
        },
      },
      tooltipDistance: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('tooltip-distance'),
        renderHTML: (attrs) => {
          if (attrs.tooltipDistance == null) return {};
          return { 
            'tooltip-distance': attrs.tooltipDistance,
          };
        },
      },
      indicatorOffset: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('indicator-offset'),
        renderHTML: (attrs) => {
          if (attrs.indicatorOffset == null) return {};
          return { 
            'indicator-offset': attrs.indicatorOffset,
          };
        },
      },
      autofocus: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('autofocus') 
            && elem.getAttribute('autofocus') !== 'false'
        ),
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
        return commands.insertFormElement(this.name, pos, {
          name: 'slider',
          ...attrs,
        });
      },
    };
  },

  addNodeView() {
    const options = {
      HTMLAttributes: this.options.HTMLAttributes,
      customBooleans: ['range', 'with-tooltip'],
    };

    return (props) => {
      return new FormSliderView({
        ...props,
        tagName: this.options.tagName,
      }, options);
    };
  },
});
