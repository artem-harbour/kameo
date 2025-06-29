import { Node, mergeAttributes, kameoHelpers } from '@kameo/core';
import { FormRadioOptionsView } from './view/FormRadioOptionsView.js';
import { createFieldSettings } from './settings/index.js';
import { FormSettingsRadioOptions, FormSettingsRadioOptionsName } from './settings/FormSettingsRadioOptions.js';
import { parseOptionsList } from './helpers/parseOptionsList.js';

const { defineComponent } = kameoHelpers;

export const FormRadioOptions = Node.create({
  name: 'formRadioOptions',

  group: 'formField block',

  atom: true,

  draggable: true,

  selectable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      tagName: 'wa-radio-group',
      tagNameOption: 'wa-radio',
      valueAttribute: {
        name: 'value',
        type: 'string',
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
          if (attrs.id == null) return {};
          return { 'data-id': attrs.id };
        },
      },
      name: {
        default: 'radio-options',
        parseHTML: (elem) => elem.getAttribute('name'),
      },
      value: { 
        default: '',
        parseHTML: (elem) => elem.getAttribute('value'),
      },
      options: {
        default: [],
        parseHTML: (elem) => parseOptionsList(elem.getAttribute('data-options')),
        renderHTML: (attrs) => {
          if (!attrs.options) return {};
          return { 
            'data-options': JSON.stringify(attrs.options),
          };
        },
      },
      label: {
        default: 'Select option',
        parseHTML: (elem) => elem.getAttribute('label'),
      },
      hint: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('hint'),
      },
      required: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('required') 
            && elem.getAttribute('required') !== 'false'
        ),
      },
      orientation: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('orientation'),
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
      insertFormRadioOptions: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormElement(this.name, pos, attrs);
      },

      addFormRadioOption: (radioOptionsNode, option) => ({
        dispatch, 
        state, 
        tr,
      }) => {
        let { pos, node } = radioOptionsNode;

        if (dispatch) {
          let currentOptions = node.attrs.options ?? [];
          let newOptions = [...currentOptions, option];

          tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            options: newOptions,
          });
        }

        return true;
      },

      removeFormRadioOption: (radioOptionsNode, index) => ({
        dispatch, 
        state, 
        tr,
      }) => {
        let { pos, node } = radioOptionsNode;

        let currentOptions = node.attrs.options ?? [];

        if (index >= currentOptions.length) {
          return false;
        }

        if (dispatch) {
          let newOptions = [
            ...currentOptions.slice(0, index),
            ...currentOptions.slice(index + 1)
          ];

          tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            options: newOptions,
          });
        }

        return true;
      },

      updateFormRadioOption: (radioOptionsNode, index, attrs) => ({
        dispatch, 
        state, 
        tr,
      }) => {
        let { pos, node } = radioOptionsNode;

        let currentOptions = node.attrs.options ?? [];

        if (index >= currentOptions.length) {
          return false;
        }

        if (dispatch) {
          let newOptions = [...currentOptions];
          newOptions[index] = {
            ...newOptions[index],
            ...attrs,
          };

          tr.setNodeMarkup(pos, undefined, {
            ...node.attrs,
            options: newOptions,
          });
        }

        return true;
      },
    };
  },

  addNodeView() {
    const options = {
      HTMLAttributes: this.options.HTMLAttributes,
    };

    return (props) => {
      return new FormRadioOptionsView({ 
        ...props,
        tagName: this.options.tagName,
        tagNameOption: this.options.tagNameOption,
      }, options);
    };
  },

  onCreate() {
    const { isHeadless } = this.editor.options;
        
    if (!isHeadless) {
      defineComponent(FormSettingsRadioOptionsName, FormSettingsRadioOptions);
    }
  },
});
