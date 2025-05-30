import { Node, mergeAttributes, kameoHelpers } from '@kameo/core';
import { FormSignatureView } from './view/FormSignatureView.js';
import { createFieldSettings } from './settings/index.js';
import { FormSignature as FormSignatureComponent, FormSignatureName } from './ui/FormSignature.js';

const { defineComponent } = kameoHelpers;

export const FormSignature = Node.create({
  name: 'formSignature',

  group: 'formField block',

  atom: true,

  draggable: true,

  selectable: true,
  
  addOptions() {
    return {
      HTMLAttributes: {},
      tagName: 'km-form-signature',
      format: 'png',
      valueAttribute: {
        name: 'value',
        type: 'string',
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
        default: 'signature',
        parseHTML: (elem) => elem.getAttribute('name'),
      },
      value: {
        default: '',
        parseHTML: (elem) => elem.getAttribute('value'),
        rendered: false,
      },
      format: {
        default: this.options.format,
        parseHTML: (elem) => elem.getAttribute('format'),
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
      insertFormSignature: (pos, attrs = {}) => ({ commands }) => {
        return commands.insertFormElement(this.name, pos, attrs);
      },
    };
  },
  
  addNodeView() {
    const options = {
      HTMLAttributes: this.options.HTMLAttributes,
      customElements: [this.options.tagName],
    };

    return (props) => {
      return new FormSignatureView({ 
        ...props,
        tagName: this.options.tagName,
      }, options);
    };
  },

  onCreate() {
    const { isHeadless } = this.editor.options;
    
    if (!isHeadless) {
      defineComponent(FormSignatureName, FormSignatureComponent);
    }
  },
});
