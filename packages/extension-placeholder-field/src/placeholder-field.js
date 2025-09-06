import { Node, mergeAttributes } from '@kameo/core';
import {
  // commands
  insertPlaceholderField,
  deletePlaceholderField,
  updatePlaceholderFieldAttrs,
  updatePlaceholderFieldById,
  deletePlaceholderFieldById,
  replacePlaceholderFieldWithValue,
  buildReplacePlaceholderFieldWithValue,
  // plugins
  placeholderFieldDrop,
  placeholderFieldPaste,
  // view
  PlaceholderFieldView,
} from 'prosemirror-placeholder-field';

const placeholderFieldClass = 'placeholder-field';
const placeholderFieldContentClass = 'placeholder-field__content';

export const PlaceholderField = Node.create({
  name: 'placeholderField',

  group: 'placeholderField inline',

  inline: true,

  atom: true,

  selectable: true,

  draggable: true,

  addOptions() {
    return {
      HTMLAttributes: {},
      replacers: {},
      nodeViewOptions: {},
      defaultColor: '#7c3aed',
      handleDropOutside: false,
    };
  },

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('data-id'),
        renderHTML: (attrs) => {
          if (!attrs.id) return {};
          return { 'data-id': attrs.id };
        },
      },
      kind: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('data-kind'),
        renderHTML: (attrs) => {
          if (!attrs.kind) return {};
          return { 'data-kind': attrs.kind };
        },
      },
      name: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('data-name'),
        renderHTML: (attrs) => {
          if (!attrs.name) return {};
          return { 'data-name': attrs.name };
        },
      },
      value: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('data-value'),
        renderHTML: (attrs) => {
          if (!attrs.value) return {};
          return { 'data-value': attrs.value };
        },
      },
      label: {
        default: null,
        parseHTML: (elem) => elem.getAttribute('data-label'),
        renderHTML: (attrs) => {
          if (!attrs.label) return {};
          return { 'data-label': attrs.label };
        },
      },
      color: {
        default: this.options.defaultColor,
        parseHTML: (elem) => elem.getAttribute('data-color'),
        renderHTML: (attrs) => {
          if (!attrs.color) return {};
          return { 'data-color': attrs.color };
        },
      },
    };
  },

  parseHTML() {
    return [{ tag: `span[data-placeholder-field]` }];
  },

  renderHTML({ HTMLAttributes, node }) {
    const contentAttrs = {
      class: placeholderFieldContentClass,
      contenteditable: 'false',
    };

    const contentContainer = ['span', contentAttrs, node.attrs.label ?? ''];

    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: placeholderFieldClass,
        'data-placeholder-field': '',
      }),
      contentContainer,
    ];
  },

  addCommands() {
    return {
      insertPlaceholderField:
        (pos, attrs = {}) =>
        ({ state, dispatch }) => {
          return insertPlaceholderField(pos, attrs)(state, dispatch);
        },

      deletePlaceholderField:
        (fields) =>
        ({ state, dispatch }) => {
          return deletePlaceholderField(fields)(state, dispatch);
        },

      updatePlaceholderFieldAttrs:
        (fields, attrs = {}) =>
        ({ state, dispatch }) => {
          return updatePlaceholderFieldAttrs(fields, attrs)(state, dispatch);
        },

      updatePlaceholderFieldById:
        (id, attrs = {}) =>
        ({ state, dispatch }) => {
          return updatePlaceholderFieldById(id, attrs)(state, dispatch);
        },

      deletePlaceholderFieldById:
        (id) =>
        ({ state, dispatch }) => {
          return deletePlaceholderFieldById(id)(state, dispatch);
        },

      replacePlaceholderFieldWithValue:
        (id) =>
        ({ state, dispatch }) => {
          const command = buildReplacePlaceholderFieldWithValue(this.options.replacers);
          return command(id)(state, dispatch);
        },
    };
  },

  addNodeView() {
    const options = {
      ...this.options.nodeViewOptions,
    };
    
    return (props) => {
      return new PlaceholderFieldView({
        node: props.node,
        view: props.view,
        getPos: props.getPos,
        options,
      });
    };
  },

  addProseMirrorPlugins() {
    return [
      placeholderFieldPaste(),
      placeholderFieldDrop({
        handleOutside: this.options.handleDropOutside,
      }),
    ];
  },
});
