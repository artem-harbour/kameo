import { Node, mergeAttributes, kameoHelpers } from '@kameo/core';
import { FormSelectView } from './view/FormSelectView.js';
import { createFieldSettings } from './settings/index.js';
import { FormSettingsSelect, FormSettingsSelectName } from './settings/FormSettingsSelect.js';
import { parseOptionsList } from './helpers/parseOptionsList.js';

const { defineComponent } = kameoHelpers;

export const FormSelect = Node.create({
  name: 'formSelect',

  group: 'formField block',

  atom: true,

  draggable: true,

  selectable: true,
  
  addOptions() {
    return {
      HTMLAttributes: {},
      tagName: 'wa-select',
      tagNameOption: 'wa-option',
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
        default: '',
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
      placeholder: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('placeholder'),
      },
      multiple: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('multiple') 
            && elem.getAttribute('multiple') !== 'false'
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
      maxOptionsVisible: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('max-options-visible'),
        renderHTML: (attrs) => {
          if (attrs.maxOptionsVisible == null) return {};
          return { 
            'max-options-visible': attrs.maxOptionsVisible,
          };
        },
      },
      size: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('size'),
      },
      appearance: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('appearance'),
      },
      pill: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('pill') && 
            elem.getAttribute('pill') !== 'false'
        ),
      },
      withClear: {
        default: false,
        parseHTML: (elem) => (
          elem.hasAttribute('with-clear') 
            && elem.getAttribute('with-clear') !== 'false'
        ),
        renderHTML: (attrs) => {
          if (!attrs.withClear) return {};
          return { 
            'with-clear': attrs.withClear,
          };
        },
      },
      placement: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('placement'),
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
      insertFormSelect: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormElement(this.name, pos, attrs);
      },

      addFormSelectOption: (select, option) => ({
        dispatch, 
        state, 
        tr,
      }) => {
        let { pos, node } = select;

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

      removeFormSelectOption: (select, index) => ({
        dispatch, 
        state, 
        tr,
      }) => {
        let { pos, node } = select;

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

      updateFormSelectOption: (select, index, attrs) => ({
        dispatch, 
        state, 
        tr,
      }) => {
        let { pos, node } = select;

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
      return new FormSelectView({ 
        ...props,
        tagName: this.options.tagName,
        tagNameOption: this.options.tagNameOption,
      }, options);
    };
  },

  onCreate() {
    const { isHeadless } = this.editor.options;
    
    if (!isHeadless) {
      defineComponent(FormSettingsSelectName, FormSettingsSelect);
    }
  },
});
